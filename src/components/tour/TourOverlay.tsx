import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import type { TourStep } from "./tourTypes";
import { tourTargetSelector } from "./tourSteps";

const PAD = 8;
const Z_BACKDROP = 85;
const Z_TOOLTIP = 87;

type Rect = { top: number; left: number; width: number; height: number };

function measureTarget(target: string | undefined, centered: boolean | undefined): Rect | null {
  if (centered || !target) return null;
  const el = document.querySelector(tourTargetSelector(target));
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top - PAD,
    left: r.left - PAD,
    width: r.width + PAD * 2,
    height: r.height + PAD * 2,
  };
}

function DimCutout({ rect }: { rect: Rect }) {
  const { top, left, width, height } = rect;
  const bottom = top + height;
  const right = left + width;
  const dim = "fixed bg-gray-900/55";

  return (
    <>
      <div className={dim} style={{ zIndex: Z_BACKDROP, top: 0, left: 0, right: 0, height: top }} />
      <div
        className={dim}
        style={{ zIndex: Z_BACKDROP, top: bottom, left: 0, right: 0, bottom: 0 }}
      />
      <div className={dim} style={{ zIndex: Z_BACKDROP, top, left: 0, width: left, height }} />
      <div
        className={dim}
        style={{ zIndex: Z_BACKDROP, top, left: right, right: 0, height }}
      />
    </>
  );
}

function SpotlightRing({ rect }: { rect: Rect }) {
  return (
    <div
      className="pointer-events-none fixed rounded-lg ring-2 ring-brand-500 shadow-[0_0_0_4px_rgba(80,72,239,0.25)]"
      style={{
        zIndex: Z_BACKDROP + 1,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
      aria-hidden
    />
  );
}

function TooltipCard({
  step,
  stepIndex,
  totalSteps,
  canNext,
  onNext,
  onSkip,
  rect,
  centered,
}: {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  canNext: boolean;
  onNext: () => void;
  onSkip: () => void;
  rect: Rect | null;
  centered?: boolean;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (centered || !rect) {
      setStyle({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "min(24rem, calc(100vw - 2rem))",
      });
      return;
    }

    const gap = 12;
    const cardW = 320;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    let top = rect.top + rect.height + gap;
    let left = rect.left;

    if (top + 180 > viewportH) {
      top = Math.max(gap, rect.top - 180 - gap);
    }
    if (left + cardW > viewportW - gap) {
      left = viewportW - cardW - gap;
    }
    if (left < gap) left = gap;

    setStyle({ top, left, maxWidth: cardW, transform: "none" });
  }, [rect, centered, step.id]);

  return (
    <div
      role="dialog"
      aria-labelledby="tour-step-title"
      className={cn(
        "fixed rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_40px_rgba(16,24,40,0.18)]",
        centered && "text-center"
      )}
      style={{ ...style, zIndex: Z_TOOLTIP }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        Step {stepIndex + 1} of {totalSteps}
      </p>
      <h3 id="tour-step-title" className="mt-1 text-base font-semibold text-gray-900">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>

      {step.advance === "clickTarget" ? (
        <p className="mt-3 text-xs font-medium text-brand-700">Click the highlighted area to continue</p>
      ) : null}

      <div
        className={cn(
          "mt-4 flex flex-wrap items-center gap-2",
          centered ? "justify-center" : "justify-between"
        )}
      >
        <Button type="button" variant="secondary" size="sm" onClick={onSkip}>
          Skip tour
        </Button>
        {step.advance === "next" ? (
          <Button size="sm" onClick={onNext} disabled={!canNext}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function TourOverlay({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onSkip,
}: {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const [rect, setRect] = useState<Rect | null>(() =>
    measureTarget(step.target, step.centered)
  );

  const remeasure = useCallback(() => {
    setRect(measureTarget(step.target, step.centered));
  }, [step.target, step.centered]);

  useLayoutEffect(() => {
    remeasure();
    const t = window.setTimeout(remeasure, 100);
    return () => window.clearTimeout(t);
  }, [remeasure, step.id]);

  useEffect(() => {
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", remeasure, true);
    return () => {
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", remeasure, true);
    };
  }, [remeasure]);

  const canNext = step.advance === "next";
  const showCutout = rect && !step.centered;

  return createPortal(
    <>
      {showCutout && rect ? (
        <>
          <DimCutout rect={rect} />
          <SpotlightRing rect={rect} />
        </>
      ) : (
        <div
          className="fixed inset-0 bg-gray-900/55"
          style={{ zIndex: Z_BACKDROP }}
          aria-hidden
        />
      )}
      <TooltipCard
        step={step}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        canNext={canNext}
        onNext={onNext}
        onSkip={onSkip}
        rect={rect}
        centered={step.centered}
      />
    </>,
    document.body
  );
}
