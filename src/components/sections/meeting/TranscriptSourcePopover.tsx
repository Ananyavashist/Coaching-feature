import { useEffect, useRef } from "react";
import type { TranscriptSummaryBullet } from "../../../data/dashboard";

export function TranscriptSourcePopover({
  bullet,
  onClose,
  anchorRect,
}: {
  bullet: TranscriptSummaryBullet;
  onClose: () => void;
  anchorRect: DOMRect | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!anchorRect) return null;

  return (
    <div
      ref={ref}
      className="fixed z-[80] w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-gray-200 bg-white p-3.5"
      style={{
        top: anchorRect.bottom + 8,
        left: Math.min(anchorRect.left, window.innerWidth - 320),
      }}
      role="dialog"
      aria-label="Transcript source"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        Transcript summary
      </p>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        <span className="font-medium text-gray-900">{bullet.sourceSpeaker}: </span>
        &ldquo;{bullet.sourceQuote}&rdquo;
      </p>
    </div>
  );
}
