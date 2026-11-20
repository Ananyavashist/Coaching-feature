import { Calendar, ArrowUpRight } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  priorities,
  type CoachingSession,
  type CoachingStatus,
} from "../../data/dashboard";
import {
  CardDivider,
  CoachingMetaRow,
  FocusTag,
  formatTimeSlot,
  IdentityBlock,
  StatusDotBadge,
} from "./session/SessionCardShared";

function managerFirstName(name: string) {
  return name.split(" ")[0]?.toUpperCase() ?? name.toUpperCase();
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

      <CoachingMetaRow
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