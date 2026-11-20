import { useMemo, useState } from "react";
import { Calendar, Clock, ChevronRight, Flag01 } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { priorities, type CoachingSession } from "../../data/dashboard";

type ArchiveTab = "board" | "transcript";

function formatDateGroup(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function formatArchivedTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function groupByDate(sessions: CoachingSession[]): Map<string, CoachingSession[]> {
  const map = new Map<string, CoachingSession[]>();
  const sorted = [...sessions].sort(
    (a, b) =>
      new Date(b.savedToSessionsAt ?? 0).getTime() -
      new Date(a.savedToSessionsAt ?? 0).getTime()
  );
  for (const s of sorted) {
    const key = s.savedToSessionsAt ? formatDateGroup(s.savedToSessionsAt) : "Unknown";
    const list = map.get(key) ?? [];
    list.push(s);
    map.set(key, list);
  }
  return map;
}

function SessionArchiveCard({
  session,
  onOpenBoard,
  onOpenTranscript,
  mode,
}: {
  session: CoachingSession;
  onOpenBoard: (s: CoachingSession) => void;
  onOpenTranscript: (s: CoachingSession) => void;
  mode: ArchiveTab;
}) {
  const priority = priorities.find((p) => p.id === session.priorityId);
  const categoryBadges = Array.from(
    new Map(session.suggestions.map((s) => [s.tag, s.tone])).entries()
  ).map(([tag, tone]) => ({ tag, tone }));

  const title =
    session.board?.challenge ??
    `Coaching Session with ${session.managerName} (${session.role})`;

  const archivedTime = session.savedToSessionsAt
    ? formatArchivedTime(session.savedToSessionsAt)
    : session.timeSlot.split(",")[0]?.trim();

  const handleOpen = () => {
    if (mode === "board") onOpenBoard(session);
    else onOpenTranscript(session);
  };

  type TopLabel = {
    key: string;
    tone: "brand" | "warning" | "gray" | "success" | "error";
    label: string;
    showFlag?: boolean;
  };

  const topLabels: TopLabel[] = [
    ...(priority
      ? [{ key: "priority", tone: priority.tone, label: priority.label, showFlag: true }]
      : []),
    ...categoryBadges.map((c) => ({
      key: c.tag,
      tone: c.tone,
      label: c.tag,
    })),
    ...(categoryBadges.length === 0 && session.category
      ? [{ key: "category", tone: "brand" as const, label: session.category }]
      : []),
    ...(mode === "board" && session.boardApprovalStatus === "draft"
      ? [{ key: "draft", tone: "warning" as const, label: "Sending request pending" }]
      : []),
    ...(mode === "board" && session.boardApprovalStatus === "pending"
      ? [{ key: "pending", tone: "brand" as const, label: "Pending manager approval" }]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {topLabels.length > 0 ? (
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          {topLabels.map((item) => (
            <Badge key={item.key} tone={item.tone}>
              {item.showFlag ? <Flag01 className="mr-1 h-3 w-3" /> : null}
              {item.label}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleOpen}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {mode === "board" ? "Details" : "Open"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-1.5 text-sm text-gray-700">
          <Calendar className="h-4.5 w-4.5 text-gray-500" />
          {session.date}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-gray-700">
          <Clock className="h-4.5 w-4.5 text-gray-500" />
          {session.timeSlot}
          {archivedTime ? (
            <span className="text-gray-400">· ended {archivedTime}</span>
          ) : null}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-semibold text-gray-900">Brief Description</h4>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {session.description}
        </p>
      </div>
    </div>
  );
}

export function SessionsArchivePage({
  sessions,
  onOpenBoard,
  onOpenTranscript,
}: {
  sessions: CoachingSession[];
  onOpenBoard: (s: CoachingSession) => void;
  onOpenTranscript: (s: CoachingSession) => void;
}) {
  const [tab, setTab] = useState<ArchiveTab>("board");
  const archived = useMemo(
    () => sessions.filter((s) => s.savedToSessionsAt != null),
    [sessions]
  );
  const groups = useMemo(() => groupByDate(archived), [archived]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-base font-semibold text-gray-900">Sessions</h1>
      <p className="mt-1 text-sm text-gray-500">
        Session boards and transcripts from completed coaching meetings.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            { id: "board" as const, label: "Session board" },
            { id: "transcript" as const, label: "Transcript" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm transition-colors",
              tab === t.id
                ? "border-gray-900 bg-white font-medium text-gray-900"
                : "border-gray-200 bg-transparent font-normal text-gray-500 hover:bg-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5" data-tour="sessions-archive-list">
        {archived.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
            No archived sessions yet. Complete a coaching meeting and leave to see it here.
          </p>
        ) : (
          Array.from(groups.entries()).map(([date, list]) => (
            <section key={date} className="mb-6">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">{date}</h2>
              <div className="space-y-4">
                {list.map((s) => (
                  <SessionArchiveCard
                    key={s.id}
                    session={s}
                    mode={tab}
                    onOpenBoard={onOpenBoard}
                    onOpenTranscript={onOpenTranscript}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
