import { useMemo, useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  ChevronRight,
  ArrowUpRight,
  InfoCircle,
  Flag01,
  MessageChatCircle,
} from "@untitledui/icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";
import { priorities, type CoachingSession, type CoachingStatus } from "../../data/dashboard";

const statusTabs: { id: CoachingStatus; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "pending", label: "Pending" },
  { id: "history", label: "History" },
  { id: "cancelled", label: "Cancelled" },
];

const priorityOrder: CoachingStatus[] = [
  "upcoming",
  "pending",
  "history",
  "cancelled",
];

function SessionCard({
  session,
  onCancel,
  onJoin,
  onDetails,
}: {
  session: CoachingSession;
  onCancel: (id: string) => void;
  onJoin: (session: CoachingSession) => void;
  onDetails: (session: CoachingSession) => void;
}) {
  const priority = priorities.find((p) => p.id === session.priorityId);

  // Distinct categories drawn from this session's suggestions.
  const categoryBadges = Array.from(
    new Map(session.suggestions.map((s) => [s.tag, s.tone])).entries()
  ).map(([tag, tone]) => ({ tag, tone }));

  const showActions = session.status === "upcoming" || session.status === "pending";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {categoryBadges.length > 0 ? (
        <div className="mb-2.5 flex flex-wrap gap-2">
          {categoryBadges.map((c) => (
            <Badge key={c.tag} tone={c.tone}>
              {c.tag}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900">
          Coaching Session with {session.managerName} ({session.role})
        </h3>
        <button
          onClick={() => onDetails(session)}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        {priority ? (
          <Badge tone={priority.tone}>
            <Flag01 className="mr-1 h-3 w-3" />
            {priority.label}
          </Badge>
        ) : null}
        <span className="flex items-center gap-1.5 text-sm text-gray-700">
          <Calendar className="h-4.5 w-4.5 text-gray-500" />
          {session.date}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-gray-700">
          <Clock className="h-4.5 w-4.5 text-gray-500" />
          {session.timeSlot}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-semibold text-gray-900">Brief Description</h4>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
          {session.description}
        </p>
      </div>

      {session.status === "pending" ? (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-brand-50 px-4 py-3">
          <InfoCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
          <p className="text-sm text-gray-600">
            Manager has not accepted the request, status will be updated once the request is
            accepted
          </p>
        </div>
      ) : null}

      {showActions ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            size="md"
            disabled={session.status === "pending"}
            onClick={() => onJoin(session)}
          >
            Join Meeting
            <ArrowUpRight className="h-4.5 w-4.5" />
          </Button>
          <Button variant="secondary" size="md">
            Reschedule
            <Calendar className="h-4.5 w-4.5" />
          </Button>
          <button
            onClick={() => onCancel(session.id)}
            className="px-2 text-sm font-semibold text-error-600 hover:text-error-700"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
}

function EmptyState({ status }: { status: CoachingStatus }) {
  const copy: Record<CoachingStatus, string> = {
    upcoming: "No upcoming sessions yet. Accepted requests will appear here.",
    pending: "No pending requests. Start one from the feedback that needs attention.",
    history: "No completed sessions yet. Finished meetings and their notes land here.",
    cancelled: "No cancelled sessions.",
    active: "",
  };
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <MessageChatCircle className="h-5 w-5" />
      </div>
      <p className="mt-3 max-w-xs text-sm text-gray-500">{copy[status]}</p>
    </div>
  );
}

export function CoachingSessionsPage({
  sessions,
  onAddRequest,
  onCancel,
  onJoin,
  onDetails,
}: {
  sessions: CoachingSession[];
  onAddRequest: () => void;
  onCancel: (id: string) => void;
  onJoin: (session: CoachingSession) => void;
  onDetails: (session: CoachingSession) => void;
}) {
  const [status, setStatus] = useState<CoachingStatus>(
    () => priorityOrder.find((st) => sessions.some((s) => s.status === st)) ?? "upcoming"
  );

  const tabCounts = useMemo(
    () => ({
      upcoming: sessions.filter((s) => s.status === "upcoming").length,
      pending: sessions.filter((s) => s.status === "pending").length,
      history: sessions.filter((s) => s.status === "history").length,
      cancelled: sessions.filter((s) => s.status === "cancelled").length,
    }),
    [sessions]
  );

  const visible = useMemo(
    () => sessions.filter((s) => s.status === status),
    [sessions, status]
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-base font-semibold text-gray-900">Sessions</h1>
        <Button onClick={onAddRequest} className="w-full sm:w-auto">
          Add new request
          <Plus className="h-4.5 w-4.5" />
        </Button>
      </div>

      {/* Status tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {statusTabs.map((t) => {
          const active = status === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setStatus(t.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-gray-900 bg-white font-medium text-gray-900"
                  : "border-gray-200 bg-transparent font-normal text-gray-500 hover:bg-white"
              )}
            >
              {t.label}
              {(tabCounts[t.id as keyof typeof tabCounts] ?? 0) > 0
                ? ` (${tabCounts[t.id as keyof typeof tabCounts]})`
                : ""}
            </button>
          );
        })}
      </div>

      {/* Sessions */}
      <div className="mt-5 space-y-4">
        {visible.length === 0 ? (
          <EmptyState status={status} />
        ) : (
          visible.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              onCancel={onCancel}
              onJoin={onJoin}
              onDetails={onDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}
