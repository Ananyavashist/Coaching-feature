import { useMemo, useState } from "react";
import { Card, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Select, type SelectOption } from "../ui/Select";
import { goals } from "../../data/dashboard";

const categoryOptions: SelectOption[] = [
  { value: "all", label: "All Categories" },
  { value: "Engineering Excellence", label: "Engineering Excellence" },
  { value: "Innovative and Strategic Thinking", label: "Innovative and Strategic Thinking" },
  { value: "Trust and Integrity", label: "Trust and Integrity" },
];

export function GoalSetting() {
  const [category, setCategory] = useState("all");

  const visible = useMemo(
    () => (category === "all" ? goals : goals.filter((g) => g.category === category)),
    [category]
  );

  return (
    <Card>
      <CardHeader
        title="Goal Setting with manager"
        subtitle="Manager aligns evaluation-period goals with company competencies."
        action={
          <Select
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            align="right"
            size="lg"
            className="w-56"
          />
        }
      />

      <div className="space-y-3 p-5 pt-4">
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
            No goals in this category yet.
          </p>
        ) : (
          visible.map((g) => (
            <div
              key={g.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h4 className="text-base font-semibold text-gray-900 sm:pr-4">{g.title}</h4>
                <Badge tone={g.tone} className="shrink-0">
                  {g.category}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{g.description}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
