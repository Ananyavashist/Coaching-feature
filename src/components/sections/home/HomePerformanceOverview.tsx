import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../ui/Card";
import { performanceCategories } from "../../../data/dashboard";
import { CategoryDetailPanel, TriangleChart } from "../performance/PerformanceRadar";

type Tab = "overview" | "activity";

export function HomePerformanceOverview() {
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedId, setSelectedId] = useState(performanceCategories[0].id);
  const selected =
    performanceCategories.find((c) => c.id === selectedId) ?? performanceCategories[0];

  return (
    <Card data-tour="performance-overview">
      <div className="border-b border-gray-200 px-5 pt-5">
        <h3 className="text-base font-semibold text-gray-900">Performance Overview</h3>
        <div className="mt-4 flex gap-6" role="tablist">
          {(
            [
              { id: "overview" as const, label: "Overview" },
              { id: "activity" as const, label: "My Activity" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "border-b-2 pb-3 text-sm font-semibold transition-colors",
                tab === t.id
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5" role="tabpanel">
        {tab === "overview" ? (
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex min-h-[280px] items-center justify-center overflow-visible py-2">
              <TriangleChart selectedId={selectedId} onSelect={setSelectedId} />
            </div>
            <CategoryDetailPanel category={selected} />
          </div>
        ) : (
          <ActivityPlaceholder />
        )}
      </div>
    </Card>
  );
}

function ActivityPlaceholder() {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
      <p className="text-sm font-medium text-gray-900">Activity for this period</p>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Updates from coaching, feedback, and completed action items will appear here.
      </p>
    </div>
  );
}