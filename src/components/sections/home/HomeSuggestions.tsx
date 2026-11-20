import { useState } from "react";
import { ChevronDown, Plus } from "@untitledui/icons";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { cn } from "../../../lib/utils";
import { homeSuggestions, type HomeSuggestion } from "../../../data/dashboard";
import { IntegrationLogo } from "../../icons/IntegrationLogos";

export function HomeSuggestions({ onViewPattern }: { onViewPattern: () => void }) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
        <h3 className="text-base font-semibold text-gray-900">Suggestions</h3>
        <Button size="sm" onClick={onViewPattern} data-tour="view-pattern">
          View AI Patterns
        </Button>
      </div>

      <ul className="divide-y divide-gray-200">
        {homeSuggestions.map((item) => (
          <li key={item.id}>
            <SuggestionRow item={item} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SuggestionRow({ item }: { item: HomeSuggestion }) {
  const [open, setOpen] = useState(Boolean(item.defaultExpanded));
  const hasDetail = item.reasoning.length > 0 || item.actionItems.length > 0;

  return (
    <div className="px-5 py-4">
      <div className="flex items-start gap-3">
        {hasDetail ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-0.5 rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            />
          </button>
        ) : (
          <span className="mt-0.5 w-6 shrink-0" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-gray-800">{item.body}</p>
          <p className="mt-2 text-sm">
            <span className="font-semibold text-[#2563EB]">Goal: {item.goalLabel}</span>
            <span className="text-gray-400"> | </span>
            <span className="font-semibold text-[#2563EB]">Criteria: {item.criteriaLabel}</span>
          </p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            <Plus className="h-4 w-4" />
            Add as Action
          </button>
        </div>
        <span className="shrink-0 text-xs text-gray-500">Generated: {item.generated}</span>
      </div>

      {open && hasDetail ? (
        <div className="mt-4 grid gap-6 border-t border-gray-100 pt-4 pl-9 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Reasoning</h4>
            <ul className="mt-2 space-y-3">
              {item.reasoning.map((r) => (
                <li key={r.id} className="flex items-start gap-3 text-sm text-gray-700">
                  <IntegrationLogo
                    source={r.source}
                    className="h-6 w-6 shrink-0"
                    title={r.source}
                  />
                  <span className="min-w-0 flex-1 leading-relaxed">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Action Items</h4>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-700">
              {item.actionItems.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}