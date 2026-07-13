import { useEffect } from "react";
import { XClose, Download01 } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { MeetingBoardPanel } from "./MeetingBoardPanel";
import { buildBoard, type CoachingSession } from "../../data/dashboard";

function buildReport(session: CoachingSession): string {
  const board = session.board ?? buildBoard(session);
  const lines = [
    "Aude.ai Coaching Session Report",
    "================================",
    "",
    `Manager: ${session.managerName} (${session.role})`,
    `Date: ${session.date}`,
    `Time: ${session.timeSlot}`,
    `Category: ${session.category}`,
    "",
    "Challenge",
    board.challenge,
    "",
    "Description",
    board.description,
    "",
    "Desired outcome",
    board.desiredOutcome,
    "",
    "Problem statement",
    board.problemStatement || "—",
    "",
    "Milestones",
    ...board.milestones.map((m) => `• ${m.text} (${m.owner}, check in ${m.checkIn})`),
    "",
    "Tasks",
    ...board.tasks.map((t) => `• ${t.text} (${t.owner}, due ${t.due})`),
    "",
    "Session notes",
    board.notes || "—",
  ];
  return lines.join("\n");
}

function downloadReport(session: CoachingSession) {
  const content = buildReport(session);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `coaching-report-${session.managerName.replace(/\s+/g, "-").toLowerCase()}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function SessionDetailOverlay({
  session,
  onClose,
}: {
  session: CoachingSession | null;
  onClose: () => void;
}) {
  const open = session != null;
  const isHistory = session?.status === "history";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-gray-900/40 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Session details"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-gray-200 bg-white transition-transform duration-300 ease-out",
          "sm:w-[520px] lg:w-[calc((100vw-16rem)/2)] lg:min-w-[440px]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Session details</h2>
          <div className="flex items-center gap-1">
            {isHistory && session ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => downloadReport(session)}
              >
                <Download01 className="h-4 w-4" />
                Download report
              </Button>
            ) : null}
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <XClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {session ? (
            <MeetingBoardPanel
              session={session}
              board={session.board ?? buildBoard(session)}
              editable={false}
            />
          ) : null}
        </div>
      </aside>
    </>
  );
}
