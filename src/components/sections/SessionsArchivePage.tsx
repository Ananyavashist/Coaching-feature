import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { type CoachingSession } from "../../data/dashboard";
import { SessionsArchiveStatusCard } from "./SessionsArchiveStatusCard";

type ArchiveTab = "board" | "transcript";

function formatDateGroup(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
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
            type="button"
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
              <div className="flex flex-col gap-5">
                {list.map((s) => (
                  <SessionsArchiveStatusCard
                    key={`${s.id}-${tab}`}
                    session={s}
                    mode={tab}
                    onOpen={() =>
                      tab === "board" ? onOpenBoard(s) : onOpenTranscript(s)
                    }
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