import { Calendar, Clock, VideoRecorder } from "@untitledui/icons";
import { cn } from "../../../lib/utils";
import { categoryFocusTagCn } from "../../../lib/categoryFocusTag";
import type { CoachingStatus } from "../../../data/dashboard";

export type DotTone = "success" | "warning" | "gray" | "error";

export const dotToneStyles: Record<DotTone, string> = {
  success: "border-success-200 bg-success-50 text-success-700",
  warning: "border-warning-200 bg-warning-50 text-warning-700",
  gray: "border-gray-200 bg-gray-50 text-gray-600",
  error: "border-error-200 bg-error-50 text-error-700",
};

const dotFill: Record<DotTone, string> = {
  success: "bg-success-600",
  warning: "bg-warning-600",
  gray: "bg-gray-400",
  error: "bg-error-600",
};

export function StatusDotBadge({ label, tone }: { label: string; tone: DotTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide",
        dotToneStyles[tone]
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotFill[tone])} aria-hidden />
      {label}
    </span>
  );
}

export function FocusTag({ tag }: { tag: string }) {
  return <span className={categoryFocusTagCn(tag)}>{tag}</span>;
}

export function IdentityBlock({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      <p className="mt-3 text-sm text-gray-500">{role}</p>
    </div>
  );
}

export function CardDivider() {
  return <div className="mt-4 border-t border-gray-200" />;
}

export function formatTimeSlot(slot: string): string {
  const parts = slot.split(",").map((s) => s.trim());
  if (parts.length >= 2) {
    const start = parts[0].replace(/pm|am/gi, (m) => m.toLowerCase());
    const end = parts[1].replace(/pm|am/gi, (m) => m.toLowerCase());
    const suffix = start.match(/(am|pm)/)?.[1] ?? end.match(/(am|pm)/)?.[1] ?? "";
    const startTime = start.replace(/\s*(am|pm)/i, "");
    return `${startTime}–${end}${suffix}`;
  }
  return slot;
}

export function SessionMetaRow({
  dateLine,
  timeLine,
  platform,
  className,
}: {
  dateLine: string;
  timeLine: string;
  platform?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700",
        className ?? "mt-4"
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-gray-500" />
        {dateLine}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-gray-500" />
        {timeLine}
      </span>
      {platform ? (
        <span className="inline-flex items-center gap-1.5">
          <VideoRecorder className="h-4 w-4 text-gray-500" />
          {platform}
        </span>
      ) : null}
    </div>
  );
}

export function CoachingMetaRow({
  status,
  dateLine,
  timeLine,
  platform,
  className,
}: {
  status: Exclude<CoachingStatus, "active">;
  dateLine: string;
  timeLine: string;
  platform?: string;
  className?: string;
}) {
  const prefix =
    status === "pending" ? "Proposed " : status === "cancelled" ? "Was " : "";
  const dateDisplay =
    status === "cancelled" || status === "pending"
      ? dateLine.startsWith("Was ") || dateLine.startsWith("Proposed ")
        ? dateLine
        : `${prefix}${dateLine}`
      : dateLine;

  return (
    <SessionMetaRow
      dateLine={dateDisplay}
      timeLine={timeLine}
      platform={status === "upcoming" ? platform : undefined}
      className={className}
    />
  );
}