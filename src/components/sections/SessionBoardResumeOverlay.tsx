import { useEffect, useState } from "react";
import { XClose } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { MeetingBoardPanel } from "./MeetingBoardPanel";
import {
  buildBoard,
  type BoardApprovalStatus,
  type CoachingSession,
  type MeetingBoard,
} from "../../data/dashboard";

export function SessionBoardResumeOverlay({
  session,
  onClose,
  onSaveBoard,
  onSendForApproval,
}: {
  session: CoachingSession | null;
  onClose: () => void;
  onSaveBoard: (sessionId: string, board: MeetingBoard) => void;
  onSendForApproval: (sessionId: string) => void;
}) {
  const open = session != null;
  const [board, setBoard] = useState<MeetingBoard | null>(null);

  useEffect(() => {
    if (!open || !session) {
      setBoard(null);
      return;
    }
    setBoard(session.board ?? buildBoard(session));
  }, [session?.id, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!session || !board) return null;

  const status: BoardApprovalStatus = session.boardApprovalStatus ?? "draft";
  const isPending = status === "pending";
  const isDraft = status === "draft";

  const handleBoardChange = (next: MeetingBoard) => {
    setBoard(next);
    onSaveBoard(session.id, next);
  };

  const handleSend = () => {
    onSendForApproval(session.id);
  };

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
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-gray-200 bg-white transition-transform duration-300 ease-out sm:w-[520px] lg:w-[calc((100vw-16rem)/2)] lg:min-w-[440px]",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <header className="flex items-start justify-between gap-3 border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Session board</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {session.managerName} · {session.date}
            </p>
            <div className="mt-2">
              {isDraft ? (
                <Badge tone="warning">Sending request pending</Badge>
              ) : isPending ? (
                <Badge tone="brand">Pending manager approval</Badge>
              ) : null}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <XClose className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 pb-24">
          <MeetingBoardPanel
            session={session}
            board={board}
            editable={!isPending}
            variant="standard"
            onChange={handleBoardChange}
          />
        </div>

        <footer className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-5 py-4">
          {isPending ? (
            <div className="text-center">
              <Button variant="primary" disabled className="w-full sm:ml-auto sm:w-auto">
                Send for approval
              </Button>
              <p className="mt-2 text-xs text-gray-500">
                Approval request sent to your manager
              </p>
            </div>
          ) : (
            <Button variant="primary" className="ml-auto w-full sm:w-auto" onClick={handleSend}>
              Send for approval
            </Button>
          )}
        </footer>
      </aside>
    </>
  );
}
