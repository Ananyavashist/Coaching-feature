import { useMemo, useState } from "react";
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

const LABEL_GAP = 10;

const labelPlacement: Record<
  keyof typeof VERTICES,
  {
    dx: number;
    dy: number;
    anchor: "middle" | "start" | "end";
    baseline: "text-after-edge" | "hanging";
    lines?: string[];
  }
> = {
  engineering: { dx: 0, dy: -LABEL_GAP, anchor: "middle", baseline: "text-after-edge" },
  trust: { dx: 0, dy: LABEL_GAP, anchor: "middle", baseline: "hanging" },
  innovation: {
    dx: 0,
    dy: LABEL_GAP,
    anchor: "middle",
    baseline: "hanging",
    lines: ["Innovation & Strategic", "Thinking"],
  },
};

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
  const values = useMemo(
    () =>
      Object.fromEntries(
        performanceCategories.map((c) => [c.id, c.value])
      ) as Record<string, number>,
    []
  );

  const dataPoints = useMemo(
    () => ({
      engineering: dataPoint("engineering", values.engineering),
      trust: dataPoint("trust", values.trust),
      innovation: dataPoint("innovation", values.innovation),
    }),
    [values]
  );

  const fillPoints = `${dataPoints.engineering.x},${dataPoints.engineering.y} ${dataPoints.trust.x},${dataPoints.trust.y} ${dataPoints.innovation.x},${dataPoints.innovation.y}`;

  const vertexIds = Object.keys(VERTICES) as (keyof typeof VERTICES)[];

  return (
    <svg
      viewBox="0 0 300 285"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      className="mx-auto h-full w-full max-h-[320px] max-w-[340px] outline-none [&_*]:outline-none"
      role="img"
      aria-label="Performance radar chart"
    >
      <polygon
        points={`${VERTICES.engineering.x},${VERTICES.engineering.y} ${VERTICES.trust.x},${VERTICES.trust.y} ${VERTICES.innovation.x},${VERTICES.innovation.y}`}
        fill="none"
        stroke="#EAECF0"
        strokeWidth="1.5"
      />
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

      {vertexIds.map((id) => {
        const dp = dataPoints[id];
        const active = selectedId === id;
        return (
          <line
            key={`spoke-${id}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={dp.x}
            y2={dp.y}
            stroke={active ? "#5048EF" : "#E4E7EC"}
            strokeWidth={active ? 2 : 1}
            className="transition-all duration-300"
          />
        );
      })}

      <polygon
        key={selectedId}
        points={fillPoints}
        fill="#5048EF"
        fillOpacity="0.18"
        stroke="#5048EF"
        strokeWidth="2"
        className="transition-all duration-300"
      />

      {vertexIds.map((id) => {
        const dp = dataPoints[id];
        const active = selectedId === id;
        return (
          <circle
            key={`data-${id}`}
            cx={dp.x}
            cy={dp.y}
            r={active ? 5 : 3}
            fill="#5048EF"
            className="pointer-events-none transition-all duration-300"
          />
        );
      })}

      {vertexIds.map((id) => {
        const cat = performanceCategories.find((c) => c.id === id)!;
        const active = selectedId === id;
        const vx = VERTICES[id];
        const place = labelPlacement[id];
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
              className="pointer-events-none transition-all duration-300"
            />
            <text
              x={vx.x + place.dx}
              y={vx.y + place.dy}
              textAnchor={place.anchor}
              dominantBaseline={place.baseline}
              className="cursor-pointer select-none fill-gray-700 text-[11px] font-semibold outline-none"
              onClick={() => onSelect(id)}
              tabIndex={-1}
            >
              {place.lines ? (
                place.lines.map((line, i) => (
                  <tspan key={line} x={vx.x + place.dx} dy={i === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))
              ) : (
                cat.label
              )}
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

      <div className="grid grid-cols-1 items-center gap-6 p-5 lg:grid-cols-2">
        <div className="flex min-h-[280px] items-center justify-center overflow-visible py-2">
          <TriangleChart selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <CategoryDetail category={selected} />
      </div>
    </Card>
  );
}
