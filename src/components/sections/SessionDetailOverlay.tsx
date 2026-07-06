import { useEffect } from "react";
import { XClose } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { MeetingBoardPanel } from "./MeetingBoardPanel";
import { buildBoard, type CoachingSession } from "../../data/dashboard";

export function SessionDetailOverlay({
  session,
  onClose,
}: {
  session: CoachingSession | null;
  onClose: () => void;
}) {
  const open = session != null;

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
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <XClose className="h-5 w-5" />
          </button>
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
