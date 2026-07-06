import { useState } from "react";
import { ArrowRight, BarChartSquare02 } from "@untitledui/icons";
import { Card } from "../ui/Card";
import {
  performanceCategories,
  performancePeriod,
  type PerformanceCategory,
} from "../../data/dashboard";

const CENTER = { x: 150, y: 132 };
const VERTICES = {
  engineering: { x: 150, y: 36 },
  trust: { x: 42, y: 218 },
  innovation: { x: 258, y: 218 },
} as const;

function dataPoint(id: keyof typeof VERTICES, value: number) {
  const v = VERTICES[id];
  const t = value / 100;
  return {
    x: CENTER.x + (v.x - CENTER.x) * t,
    y: CENTER.y + (v.y - CENTER.y) * t,
  };
}

function TriangleChart({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const engineering = performanceCategories.find((c) => c.id === "engineering")!;
  const trust = performanceCategories.find((c) => c.id === "trust")!;
  const innovation = performanceCategories.find((c) => c.id === "innovation")!;

  const p1 = dataPoint("engineering", engineering.value);
  const p2 = dataPoint("trust", trust.value);
  const p3 = dataPoint("innovation", innovation.value);
  const fillPoints = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

  const labels: { id: keyof typeof VERTICES; x: number; y: number; anchor: string }[] = [
    { id: "engineering", x: 150, y: 12, anchor: "middle" },
    { id: "trust", x: 8, y: 232, anchor: "start" },
    { id: "innovation", x: 292, y: 232, anchor: "end" },
  ];

  return (
    <svg viewBox="0 0 300 250" className="mx-auto h-auto w-full max-w-sm outline-none [&_*]:outline-none" role="img">
      {/* Outer triangle */}
      <polygon
        points={`${VERTICES.engineering.x},${VERTICES.engineering.y} ${VERTICES.trust.x},${VERTICES.trust.y} ${VERTICES.innovation.x},${VERTICES.innovation.y}`}
        fill="none"
        stroke="#EAECF0"
        strokeWidth="1.5"
      />
      {/* Mid guides */}
      {[0.33, 0.66].map((t) => {
        const e = {
          x: CENTER.x + (VERTICES.engineering.x - CENTER.x) * t,
          y: CENTER.y + (VERTICES.engineering.y - CENTER.y) * t,
        };
        const tl = {
          x: CENTER.x + (VERTICES.trust.x - CENTER.x) * t,
          y: CENTER.y + (VERTICES.trust.y - CENTER.y) * t,
        };
        const tr = {
          x: CENTER.x + (VERTICES.innovation.x - CENTER.x) * t,
          y: CENTER.y + (VERTICES.innovation.y - CENTER.y) * t,
        };
        return (
          <polygon
            key={t}
            points={`${e.x},${e.y} ${tl.x},${tl.y} ${tr.x},${tr.y}`}
            fill="none"
            stroke="#F2F4F7"
            strokeWidth="1"
          />
        );
      })}
      {/* Data fill */}
      <polygon points={fillPoints} fill="#5048EF" fillOpacity="0.18" stroke="#5048EF" strokeWidth="2" />
      {/* Click targets at vertices */}
      {labels.map(({ id, x, y }) => {
        const cat = performanceCategories.find((c) => c.id === id)!;
        const active = selectedId === id;
        const vx = VERTICES[id];
        return (
          <g key={id}>
            <circle
              cx={vx.x}
              cy={vx.y}
              r={18}
              fill="transparent"
              className="cursor-pointer outline-none"
              onClick={() => onSelect(id)}
              tabIndex={-1}
            />
            <circle
              cx={vx.x}
              cy={vx.y}
              r={active ? 4 : 2}
              fill={active ? "#5048EF" : "#D0D5DD"}
              className="pointer-events-none transition-all"
            />
            <text
              x={x}
              y={y}
              textAnchor={labels.find((l) => l.id === id)!.anchor as "middle" | "start" | "end"}
              className="cursor-pointer select-none fill-gray-700 text-[11px] font-semibold outline-none"
              onClick={() => onSelect(id)}
              tabIndex={-1}
            >
              {cat.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CategoryDetail({ category }: { category: PerformanceCategory }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold text-gray-900">{category.label}</h4>
          <p className="mt-0.5 text-sm text-gray-500">{performancePeriod}</p>
        </div>
        <span className="text-3xl font-semibold tabular-nums text-gray-900">
          {category.value}%
        </span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{category.summary}</p>
      <a
        href="#"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] no-underline hover:opacity-80"
      >
        View Full Evaluation
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

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

      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
        <div className="flex items-center justify-center py-2">
          <TriangleChart selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <CategoryDetail category={selected} />
      </div>
    </Card>
  );
}
