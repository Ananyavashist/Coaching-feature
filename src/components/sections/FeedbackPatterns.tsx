import { useMemo, useState } from "react";
import { SwitchHorizontal01 } from "@untitledui/icons";
import { Card, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { categoryFocusTagCn } from "../../lib/categoryFocusTag";
import { Checkbox } from "../ui/Checkbox";
import { cn } from "../../lib/utils";
import {
  feedbackPatterns,
  type FeedbackPattern,
  type SuggestionPattern,
} from "../../data/dashboard";

const tagOffset: Record<FeedbackPattern["labelPos"], string> = {
  top: "bottom-full left-1/2 mb-2.5 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2.5 -translate-x-1/2",
  "bottom-right": "left-full top-1/2 ml-3 -translate-y-1/2",
  "top-left": "right-full top-1/2 mr-3 -translate-y-1/2",
};

function BubbleLabel({ text, pos }: { text: string; pos: FeedbackPattern["labelPos"] }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-20 block w-max max-w-[11rem] rounded-[6px] border border-gray-700 bg-white p-1.5 text-center text-xs font-medium leading-snug text-gray-700",
        tagOffset[pos]
      )}
    >
      {text}
    </span>
  );
}

function BubbleChart() {
  const max = Math.max(...feedbackPatterns.map((b) => b.size));
  const min = Math.min(...feedbackPatterns.map((b) => b.size));
  const scale = (size: number) => 48 + ((size - min) / (max - min || 1)) * 80;

  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-4xl sm:h-[24rem]">
      {feedbackPatterns.map((b) => {
        const d = Math.round(scale(b.size));
        return (
          <div
            key={b.id}
            className="absolute"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: d,
              height: d,
              transform: `translate(calc(-50% + ${b.offsetX ?? 0}px), calc(-50% + ${b.offsetY ?? 0}px))`,
            }}
          >
            <BubbleLabel text={b.label} pos={b.labelPos} />
            <div
              className="absolute inset-0 rounded-full bg-brand-500"
              style={{ width: d, height: d }}
              aria-hidden
            />
          </div>
        );
      })}
    </div>
  );
}

function BubbleList() {
  const max = Math.max(...feedbackPatterns.map((b) => b.size));
  return (
    <ul className="space-y-3">
      {feedbackPatterns.map((b) => (
        <li key={b.id} className="flex items-center gap-3">
          <span
            className="shrink-0 rounded-full bg-brand-500"
            style={{ width: 12 + (b.size / max) * 24, height: 12 + (b.size / max) * 24 }}
          />
          <span className="text-sm font-medium text-gray-700">{b.label}</span>
        </li>
      ))}
    </ul>
  );
}

const toSuggestion = (f: FeedbackPattern): SuggestionPattern => ({
  id: f.id,
  tag: f.category,
  tone: f.tone,
  text: f.detail,
});

export function FeedbackPatterns({
  onInitiateCoaching,
}: {
  onInitiateCoaching: (selected: SuggestionPattern[]) => void;
}) {
  const topFeedback = useMemo(
    () => [...feedbackPatterns].sort((a, b) => b.size - a.size).slice(0, 3),
    []
  );
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleInitiate = () => {
    const chosen = topFeedback.filter((f) => selected.includes(f.id));
    onInitiateCoaching(chosen.map(toSuggestion));
  };

  return (
    <Card data-tour="feedback-patterns">
      <CardHeader
        title="Patterns recognized from feedback"
        subtitle="Patterns recognised in the visualization are derived from platform and peer feedback together."
      />

      <div className="p-5 pt-4">
        <div className="mb-2 flex items-center justify-end gap-2 text-gray-400">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300">
            <SwitchHorizontal01 className="h-2.5 w-2.5" />
          </span>
          <span className="text-sm">Size proportional to number of feedbacks</span>
        </div>

        <div className="hidden md:block">
          <BubbleChart />
        </div>
        <div className="md:hidden">
          <BubbleList />
        </div>

        <div
          className="mt-5 rounded-xl border border-gray-200 bg-white p-4"
          data-tour="feedback-insights"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-base font-semibold text-gray-900">Pattern Feedback Insights</h4>
            <Button size="sm" onClick={handleInitiate} disabled={selected.length === 0}>
              Initiate Coaching
            </Button>
          </div>

          <div className="my-4 border-t border-gray-200" />

          <ul className="space-y-2.5">
            {topFeedback.map((f) => (
              <li key={f.id}>
                <label className="flex cursor-pointer items-center gap-3">
                  <span className="shrink-0">
                    <Checkbox
                      checked={selected.includes(f.id)}
                      onChange={() => toggle(f.id)}
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-gray-700">
                    {f.label}
                  </span>
                  <span className={categoryFocusTagCn(f.category)}>{f.category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
