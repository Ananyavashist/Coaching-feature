import { useState } from "react";
import { BarChartSquare02 } from "@untitledui/icons";
import { Card } from "../ui/Card";
import { performanceCategories } from "../../data/dashboard";
import { CategoryDetailPanel, TriangleChart } from "./performance/PerformanceRadar";

export function PerformanceOverview() {
  const [selectedId, setSelectedId] = useState(performanceCategories[0].id);
  const selected =
    performanceCategories.find((c) => c.id === selectedId) ?? performanceCategories[0];

  return (
    <Card>
      <div className="flex items-center gap-2 border-b border-gray-200 px-5 pb-4 pt-5">
        <BarChartSquare02 className="h-5 w-5 text-gray-500" />
        <h3 className="text-base font-semibold text-gray-900">Performance Overview</h3>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 p-5 lg:grid-cols-2">
        <div className="flex min-h-[280px] items-center justify-center overflow-visible py-2">
          <TriangleChart selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <CategoryDetailPanel category={selected} />
      </div>
    </Card>
  );
}