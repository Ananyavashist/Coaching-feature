import { useEffect } from "react";
import { XClose } from "@untitledui/icons";
import { FloatingOverlayBackdrop, FloatingOverlayPanel } from "../ui/FloatingOverlay";
import { TranscriptChatbotPanel } from "./meeting/TranscriptChatbotPanel";
import {
  createEmptyTranscript,
  type CoachingSession,
  type MeetingTranscript,
} from "../../data/dashboard";

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

  return (
    <>
      <FloatingOverlayBackdrop open={open} onClose={onClose} />

      <FloatingOverlayPanel open={open} ariaLabel="Transcript" width="lg">
        {session ? (
          <>
            <header className="shrink-0 border-b border-gray-200 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
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
              </div>
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
          </>
        ) : null}
      </FloatingOverlayPanel>
    </>
  );
}
