import { useEffect } from "react";
import { XClose } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { TranscriptChatbotPanel } from "./meeting/TranscriptChatbotPanel";
import { createEmptyTranscript, type CoachingSession, type MeetingTranscript } from "../../data/dashboard";

export function TranscriptArchiveOverlay({
  session,
  onClose,
  onUpdateTranscript,
}: {
  session: CoachingSession | null;
  onClose: () => void;
  onUpdateTranscript?: (sessionId: string, transcript: MeetingTranscript) => void;
}) {
  const open = session != null;
  const transcript = session?.transcript ?? createEmptyTranscript();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!session) return null;

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
            <h2 className="text-lg font-semibold text-gray-900">Transcript</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Coaching session with {session.managerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <XClose className="h-5 w-5" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <TranscriptChatbotPanel
            session={session}
            transcript={transcript}
            readOnly={false}
            showCopy={false}
            onUpdateTranscript={(t) => onUpdateTranscript?.(session.id, t)}
          />
        </div>
      </aside>
    </>
  );
}
