import { useState, type ReactNode } from "react";
import {
  Microphone01,
  MicrophoneOff01,
  VideoRecorder,
  VideoRecorderOff,
  Users01,
  MessageCircle01,
  Share07,
  Stars02,
  LogOut01,
  DotsHorizontal,
  CalendarPlus02,
} from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { MeetingBoardPanel } from "./MeetingBoardPanel";
import { MeetingChatPanel } from "./MeetingChatPanel";
import { CreateSessionModal } from "./CreateSessionModal";
import {
  buildBoard,
  draftBoardFromTranscript,
  type CoachingSession,
  type MeetingBoard,
} from "../../data/dashboard";

function Control({
  icon,
  label,
  onClick,
  active,
  ariaLabel,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      aria-pressed={active}
      className={cn(
        "flex min-w-[64px] flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
        active ? "bg-brand-500/20 text-brand-200" : "text-gray-300 hover:bg-white/10"
      )}
    >
      <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      {label}
    </button>
  );
}

type SideTab = "board" | "chat";

export function MeetingCallScreen({
  session,
  goBy,
  initialTranscript,
  onEnd,
  onCreateSession,
  previousBoard,
}: {
  session: CoachingSession;
  goBy: string;
  initialTranscript: boolean;
  onEnd: (board: MeetingBoard) => void;
  onCreateSession: (session: CoachingSession) => void;
  previousBoard?: MeetingBoard;
}) {
  const [board, setBoard] = useState<MeetingBoard>(
    () => session.board ?? buildBoard(session, true)
  );
  const [muted, setMuted] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [transcriptOn, setTranscriptOn] = useState(initialTranscript);
  const [sideTab, setSideTab] = useState<SideTab>("board");
  const [createOpen, setCreateOpen] = useState(false);

  const applyAiDraft = (b: MeetingBoard) => draftBoardFromTranscript(session, b);

  const stopTranscript = () => {
    setTranscriptOn(false);
    setBoard((b) => applyAiDraft(b));
  };

  const leave = () => {
    onEnd(transcriptOn ? applyAiDraft(board) : board);
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex flex-col bg-gray-950 lg:flex-row">
        {/* Video stage (60%) */}
        <div className="flex min-h-[45vh] flex-1 flex-col bg-gray-900 lg:min-h-0 lg:w-[60%]">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="truncate text-sm font-medium text-white">
              Coaching session with {session.managerName}
            </p>
            <div
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-red-400"
              role="status"
              aria-live="polite"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden />
              REC
            </div>
          </div>

          <div className="mx-4 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-xs text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
            This meeting is being recorded.
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 py-8">
            {videoOn ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <VideoRecorder className="h-10 w-10" />
                <span className="text-sm">Your camera is on</span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-white sm:text-5xl">{goBy}</span>
            )}
            <span className="absolute bottom-3 left-4 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
              {goBy}
            </span>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-1 border-t border-white/10 bg-gray-950 px-4 py-3"
            role="toolbar"
            aria-label="Meeting controls"
          >
            <Control
              icon={muted ? <MicrophoneOff01 /> : <Microphone01 />}
              label={muted ? "Unmute" : "Mute"}
              onClick={() => setMuted((m) => !m)}
            />
            <Control
              icon={videoOn ? <VideoRecorder /> : <VideoRecorderOff />}
              label={videoOn ? "Stop video" : "Start video"}
              onClick={() => setVideoOn((v) => !v)}
            />
            <Control
              icon={<CalendarPlus02 />}
              label="Create session"
              onClick={() => setCreateOpen(true)}
              ariaLabel="Create new coaching session"
            />
            <Control icon={<Users01 />} label="Participants" />
            <Control
              icon={<MessageCircle01 />}
              label="Chat"
              active={sideTab === "chat"}
              onClick={() => setSideTab("chat")}
            />
            <Control icon={<Share07 />} label="Share" />
            <Control
              icon={<Stars02 />}
              label={transcriptOn ? "Stop transcript" : "AI transcript"}
              active={transcriptOn}
              onClick={transcriptOn ? stopTranscript : () => setTranscriptOn(true)}
            />
            <Control icon={<DotsHorizontal />} label="More" />
            <div className="mx-1 h-8 w-px bg-white/10" aria-hidden />
            <button
              type="button"
              onClick={leave}
              aria-label="Leave meeting"
              className="flex min-w-[72px] flex-col items-center gap-1 rounded-lg bg-error-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-error-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-error-300"
            >
              <LogOut01 className="h-5 w-5" aria-hidden />
              Leave
            </button>
          </div>
        </div>

        {/* Right panel (40%) */}
        <div className="flex w-full flex-col overflow-hidden bg-gray-50 lg:w-[40%]">
          <div className="border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-5 py-2">
              {transcriptOn ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
                  <Stars02 className="h-3.5 w-3.5" />
                  AI transcript on
                </span>
              ) : (
                <span className="text-xs text-gray-500">Transcript stopped</span>
              )}
            </div>
            <div className="flex px-3" role="tablist" aria-label="Meeting sidebar">
              {(
                [
                  { id: "board" as const, label: "Session board" },
                  { id: "chat" as const, label: "Chat" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={sideTab === tab.id}
                  onClick={() => setSideTab(tab.id)}
                  className={cn(
                    "border-b-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                    sideTab === tab.id
                      ? "border-gray-900 font-medium text-gray-900"
                      : "border-transparent font-normal text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" role="tabpanel">
            {sideTab === "board" ? (
              <div className="p-5">
                <MeetingBoardPanel
                  session={session}
                  board={board}
                  editable
                  variant="live"
                  onChange={setBoard}
                />
              </div>
            ) : (
              <MeetingChatPanel session={session} />
            )}
          </div>
        </div>
      </div>

      <CreateSessionModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        defaultManagerId={session.managerId}
        currentBoard={board}
        previousBoard={previousBoard ?? session.board}
        onSubmit={onCreateSession}
      />
    </>
  );
}
