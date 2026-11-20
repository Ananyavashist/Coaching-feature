import { Calendar, Clock, VideoRecorder, ArrowUpRight } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";
import { categoryFocusTagCn } from "../../lib/categoryFocusTag";
import {
  priorities,
  type CoachingSession,
  type CoachingStatus,
} from "../../data/dashboard";

type DotTone = "success" | "warning" | "gray" | "error";

const dotToneStyles: Record<DotTone, string> = {
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

function StatusDotBadge({ label, tone }: { label: string; tone: DotTone }) {
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

function FocusTag({ tag }: { tag: string }) {
  return <span className={categoryFocusTagCn(tag)}>{tag}</span>;
}

function managerFirstName(name: string) {
  return name.split(" ")[0]?.toUpperCase() ?? name.toUpperCase();
}

function formatTimeSlot(slot: string): string {
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

export function CoachingStatusSessionCard({
  session,
  onCancel,
  onJoin,
  onDetails,
  onAddRequest,
  joinTourAnchor,
}: {
  session: CoachingSession;
  onCancel: (id: string) => void;
  onJoin: (session: CoachingSession) => void;
  onDetails: (session: CoachingSession) => void;
  onAddRequest?: () => void;
  joinTourAnchor?: boolean;
}) {
  const status = session.status as Exclude<CoachingStatus, "active">;
  const priority = priorities.find((p) => p.id === session.priorityId);
  const categoryTags = Array.from(
    new Set(session.suggestions.map((s) => s.tag))
  ).slice(0, 2);

  const dateLine = session.dateMeta ?? session.date;
  const timeLine = session.timeMeta ?? formatTimeSlot(session.timeSlot);

  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {status === "upcoming" ? (
            <StatusDotBadge label="Confirmed" tone="success" />
          ) : null}
          {status === "pending" ? (
            <StatusDotBadge
              label={`Awaiting ${managerFirstName(session.managerName)}`}
              tone="warning"
            />
          ) : null}
          {status === "history" ? <StatusDotBadge label="Completed" tone="gray" /> : null}
          {status === "cancelled" ? <StatusDotBadge label="Cancelled" tone="error" /> : null}
          {priority ? (
            <Badge tone={priority.tone} className="font-medium">
              {priority.label}
            </Badge>
          ) : null}
        </div>

        {status === "upcoming" && session.contextRight ? (
          <span className="shrink-0 text-sm font-medium text-success-600">
            {session.contextRight}
          </span>
        ) : null}
        {status === "pending" && session.contextRight ? (
          <span className="shrink-0 text-sm text-gray-500">{session.contextRight}</span>
        ) : null}
        {status === "cancelled" && session.contextRight ? (
          <span className="shrink-0 text-right text-xs text-gray-500">{session.contextRight}</span>
        ) : null}
      </div>

      <IdentityBlock name={session.managerName} role={session.role} />

      {categoryTags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryTags.map((tag) => (
            <FocusTag key={tag} tag={tag} />
          ))}
        </div>
      ) : null}

      <MetaRow
        status={status}
        dateLine={dateLine}
        timeLine={timeLine}
        platform={session.meetingPlatform}
        className={categoryTags.length > 0 ? "mt-3" : "mt-4"}
      />

      <CardDivider />

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-900">Description</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-4">
          {session.description}
        </p>
      </div>

      <div className="mt-auto pt-5">
        <ActionRow
          status={status}
          session={session}
          onJoin={onJoin}
          onCancel={onCancel}
          onDetails={onDetails}
          onAddRequest={onAddRequest}
          joinTourAnchor={joinTourAnchor}
        />
      </div>
    </article>
  );
}

function IdentityBlock({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      <p className="mt-0.5 text-sm text-gray-500">{role}</p>
    </div>
  );
}

function CardDivider() {
  return <div className="mt-4 border-t border-gray-200" />;
}

function MetaRow({
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
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700",
        className ?? "mt-4"
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-gray-500" />
        {dateDisplay}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-gray-500" />
        {timeLine}
      </span>
      {status === "upcoming" && platform ? (
        <span className="inline-flex items-center gap-1.5">
          <VideoRecorder className="h-4 w-4 text-gray-500" />
          {platform}
        </span>
      ) : null}
    </div>
  );
}

function ActionRow({
  status,
  session,
  onJoin,
  onCancel,
  onDetails,
  onAddRequest,
  joinTourAnchor,
}: {
  status: Exclude<CoachingStatus, "active">;
  session: CoachingSession;
  onJoin: (session: CoachingSession) => void;
  onCancel: (id: string) => void;
  onDetails: (session: CoachingSession) => void;
  onAddRequest?: () => void;
  joinTourAnchor?: boolean;
}) {
  if (status === "upcoming") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="md"
          data-tour={joinTourAnchor ? "join-meeting" : undefined}
          onClick={() => onJoin(session)}
        >
          Join Meeting
          <ArrowUpRight className="h-4.5 w-4.5" />
        </Button>
        <Button variant="secondary" size="md" type="button">
          Reschedule
          <Calendar className="h-4.5 w-4.5" />
        </Button>
        <button
          type="button"
          onClick={() => onCancel(session.id)}
          className="px-2 text-sm font-semibold text-error-600 hover:text-error-700"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="md" variant="secondary" disabled>
          Join Meeting
          <ArrowUpRight className="h-4.5 w-4.5" />
        </Button>
        <Button variant="secondary" size="md" type="button">
          Edit request
        </Button>
        <button
          type="button"
          onClick={() => onCancel(session.id)}
          className="px-2 text-sm font-semibold text-error-600 hover:text-error-700"
        >
          Withdraw
        </button>
      </div>
    );
  }

  if (status === "history") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="md"
          className="border-brand-600 bg-brand-500 hover:bg-brand-600 hover:border-brand-600"
          onClick={() => onDetails(session)}
        >
          View notes
          <ArrowUpRight className="h-4.5 w-4.5" />
        </Button>
        <Button variant="secondary" size="md" type="button" onClick={() => onAddRequest?.()}>
          Book follow-up
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="md" onClick={() => onAddRequest?.()}>
        Request again
      </Button>
      <Button variant="secondary" size="md" onClick={() => onDetails(session)}>
        View request
      </Button>
    </div>
  );
}