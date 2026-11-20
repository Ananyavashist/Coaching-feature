import { Calendar, DotsHorizontal } from "@untitledui/icons";
import { Card } from "../../ui/Card";
import { cn } from "../../../lib/utils";
import { homeActionItems, type HomeActionItem, type HomeActionStatus } from "../../../data/dashboard";

const statusStrip: {
  id: HomeActionStatus;
  label: string;
  bg: string;
  text: string;
}[] = [
  { id: "up-next", label: "UP NEXT", bg: "bg-sky-50", text: "text-sky-900" },
  { id: "on-it", label: "ON IT", bg: "bg-amber-50", text: "text-amber-900" },
  { id: "nailed-it", label: "NAILED IT", bg: "bg-success-50", text: "text-success-700" },
  { id: "blocked", label: "BLOCKED", bg: "bg-error-50", text: "text-error-700" },
];

const statusLabel: Record<HomeActionStatus, string> = {
  "up-next": "Up Next",
  "on-it": "On It",
  "nailed-it": "Nailed It",
  blocked: "Blocked",
};

const statusPillClass: Record<HomeActionStatus, string> = {
  "up-next": "bg-sky-100 text-sky-800 border-sky-200",
  "on-it": "bg-amber-100 text-amber-800 border-amber-200",
  "nailed-it": "bg-success-100 text-success-800 border-success-200",
  blocked: "bg-error-100 text-error-800 border-error-200",
};

function countByStatus(status: HomeActionStatus) {
  return homeActionItems.filter((i) => i.status === status).length;
}

export function HomeActionItems() {
  return (
    <Card>
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-base font-semibold text-gray-900">Action Items</h3>
      </div>

      <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4">
        {statusStrip.map((s) => (
          <div
            key={s.id}
            className={cn("px-4 py-3 text-center", s.bg)}
          >
            <p className={cn("text-[11px] font-bold tracking-wide", s.text)}>{s.label}</p>
            <p className={cn("mt-0.5 text-lg font-semibold tabular-nums", s.text)}>
              {countByStatus(s.id)}
            </p>
          </div>
        ))}
      </div>

      <ul className="divide-y divide-gray-200">
        {homeActionItems.map((item) => (
          <ActionItemRow key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
}

function ActionItemRow({ item }: { item: HomeActionItem }) {
  return (
    <li className="relative px-5 py-4">
      <button
        type="button"
        className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
        aria-label="More options"
      >
        <DotsHorizontal className="h-5 w-5" />
      </button>
      <p className="pr-10 text-sm leading-relaxed text-gray-800">{item.body}</p>
      <p className="mt-2 text-sm">
        <span className="font-semibold text-[#2563EB]">Goal: {item.goalLabel}</span>
        <span className="text-gray-400"> | </span>
        <span className="font-semibold text-[#2563EB]">Criteria: {item.criteriaLabel}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex rounded-md border px-2 py-1 text-xs font-semibold",
            statusPillClass[item.status]
          )}
        >
          {statusLabel[item.status]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700">
          <Calendar className="h-3.5 w-3.5 text-gray-500" />
          {item.dueDate}
        </span>
        <span className="inline-flex rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
          {item.priority} Priority
        </span>
      </div>
    </li>
  );
}