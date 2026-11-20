import { useMemo, useState } from "react";
import { Plus, MessageChatCircle } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { type CoachingSession, type CoachingStatus } from "../../data/dashboard";
import { CoachingStatusSessionCard } from "./CoachingStatusSessionCard";

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

const listableStatuses: CoachingStatus[] = [
  "upcoming",
  "pending",
  "history",
  "cancelled",
];

function CoachingSessionsEmptyState({
  status,
  onAddRequest,
}: {
  status: CoachingStatus;
  onAddRequest: () => void;
}) {
  const isUpcomingOrPending = status === "upcoming" || status === "pending";

  const title =
    status === "upcoming"
      ? "No upcoming sessions yet"
      : status === "pending"
        ? "No pending requests"
        : status === "history"
          ? "No completed sessions yet"
          : "No cancelled sessions";

  const body = isUpcomingOrPending ? (
    <>
      Review your feedback patterns on Overview to see where coaching could help. Work with your
      manager to align on focus areas, then send a new request when you are ready.
    </>
  ) : status === "history" ? (
    <>Finished coaching meetings and their session boards will show up here after you leave a call.</>
  ) : (
    <>Sessions you or your manager cancel will appear here for reference.</>
  );

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <MessageChatCircle className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-gray-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">{body}</p>
      {isUpcomingOrPending ? (
        <div className="mt-6">
          <Button onClick={onAddRequest} data-tour="coaching-add-request">
            Add new request
            <Plus className="h-4.5 w-4.5" />
          </Button>
        </div>
      ) : null}
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
    () =>
      priorityOrder.find((st) =>
        sessions.some((s) => s.status === st)
      ) ?? "upcoming"
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
    () =>
      sessions.filter(
        (s) => s.status === status && listableStatuses.includes(s.status)
      ),
    [sessions, status]
  );

  const firstUpcomingId = useMemo(
    () => sessions.find((s) => s.status === "upcoming")?.id,
    [sessions]
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-base font-semibold text-gray-900">Sessions</h1>
        <Button
          onClick={onAddRequest}
          className="w-full sm:w-auto"
          data-tour="coaching-add-request"
        >
          Add new request
          <Plus className="h-4.5 w-4.5" />
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {statusTabs.map((t) => {
          const active = status === t.id;
          return (
            <button
              key={t.id}
              type="button"
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

      <div className="mt-5" data-tour="coaching-sessions-list">
        {visible.length === 0 ? (
          <CoachingSessionsEmptyState status={status} onAddRequest={onAddRequest} />
        ) : (
          <div className="flex flex-col gap-5">
            {visible.map((s) => (
              <CoachingStatusSessionCard
                key={s.id}
                session={s}
                onCancel={onCancel}
                onJoin={onJoin}
                onDetails={onDetails}
                onAddRequest={onAddRequest}
                joinTourAnchor={status === "upcoming" && s.id === firstUpcomingId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}