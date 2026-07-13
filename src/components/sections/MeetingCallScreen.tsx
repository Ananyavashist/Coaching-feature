import { useState, useEffect, useCallback, type ReactNode } from "react";
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
  InfoCircle,
  XClose,
  Grid01,
} from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { MeetingBoardPanel } from "./MeetingBoardPanel";
import { MeetingChatPanel } from "./MeetingChatPanel";
import { CreateSessionModal } from "./CreateSessionModal";
import { LiveTranscriptPanel } from "./meeting/LiveTranscriptPanel";
import { TranscriptSummaryLoading } from "./meeting/TranscriptSummaryLoading";
import { TranscriptChatbotPanel } from "./meeting/TranscriptChatbotPanel";
import { LeaveWithoutApprovalModal } from "./meeting/LeaveWithoutApprovalModal";
import {
  buildBoard,
  buildLiveTranscriptScript,
  coaches,
  createEmptyTranscript,
  currentUser,
  generateTranscriptSummary,
  type BoardApprovalStatus,
  type CoachingSession,
  type MeetingBoard,
  type MeetingTranscript,
  type TranscriptLine,
} from "../../data/dashboard";

function Control({
  icon,
  label,
  onClick,
  active,
  ariaLabel,
  disabled,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-pressed={active}
      className={cn(
        "flex min-w-[64px] flex-col items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:border-white/40 disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-brand-400/60 bg-brand-500/20 text-brand-200"
          : "border-transparent text-gray-300 hover:border-white/20 hover:bg-white/10"
      )}
    >
      <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      {label}
    </button>
  );
}

function AiTranscriptBanner() {
  return (
    <div className="mx-4 flex items-start gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-xs text-brand-100">
      <InfoCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-200" />
      <p>
        AI is transcribing this session in the background to capture notes and key takeaways.
      </p>
    </div>
  );
}

function ParticipantTile({
  name,
  role,
  avatar,
  muted,
  videoOn,
  highlight,
}: {
  name: string;
  role: string;
  avatar?: string;
  muted?: boolean;
  videoOn?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-transparent bg-gray-800",
        highlight && "border-brand-400/60"
      )}
    >
      {videoOn && avatar ? (
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="px-4 text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {name}
        </span>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
          {name}
        </span>
        {muted !== undefined ? (
          <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] text-gray-300">
            {muted ? "Muted" : "Unmuted"}
          </span>
        ) : null}
      </div>
      <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-gray-300">
        {role}
      </span>
    </div>
  );
}

type SideTab = "board" | "chat" | "transcript";

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
  onEnd: (payload: {
    board: MeetingBoard;
    transcript: MeetingTranscript;
    approvalStatus: BoardApprovalStatus;
  }) => void;
  onCreateSession: (session: CoachingSession) => void;
  previousBoard?: MeetingBoard;
}) {
  const [board, setBoard] = useState<MeetingBoard>(
    () => session.board ?? buildBoard(session, true)
  );
  const [transcript, setTranscript] = useState<MeetingTranscript>(createEmptyTranscript);
  const [muted, setMuted] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [transcriptOn, setTranscriptOn] = useState(initialTranscript);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [sideTab, setSideTab] = useState<SideTab>("board");
  const [boardOpen, setBoardOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [boardToast, setBoardToast] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<BoardApprovalStatus>("draft");

  const [transcriptListening, setTranscriptListening] = useState(false);
  const [typingLine, setTypingLine] = useState<TranscriptLine | null>(null);
  const [typedText, setTypedText] = useState("");

  const manager = coaches.find((c) => c.id === session.managerId);
  const script = buildLiveTranscriptScript(session);
  const boardLocked = approvalStatus === "pending";

  const delay = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

  // Stream live transcript with listening pause + typing animation.
  useEffect(() => {
    if (!transcriptOn) {
      setTranscriptListening(false);
      setTypingLine(null);
      setTypedText("");
      return;
    }

    let cancelled = false;

    const stream = async () => {
      for (let index = 0; index < script.length; index++) {
        if (cancelled) return;

        setTranscriptListening(true);
        setTypingLine(null);
        setTypedText("");
        await delay(2000 + Math.random() * 1500);

        if (cancelled) return;
        const raw = script[index];
        const line: TranscriptLine = { ...raw, id: `tl-${Date.now()}-${index}` };

        setTranscriptListening(false);
        setTypingLine(line);

        for (let c = 0; c <= line.text.length; c++) {
          if (cancelled) return;
          setTypedText(line.text.slice(0, c));
          await delay(32 + Math.random() * 28);
        }

        if (cancelled) return;
        setTranscript((t) => ({ ...t, lines: [...t.lines, line] }));
        setTypingLine(null);
        setTypedText("");

        await delay(1500 + Math.random() * 1000);
      }
    };

    stream();
    return () => {
      cancelled = true;
    };
  }, [transcriptOn, script]);

  const stopTranscript = () => {
    setTranscriptOn(false);
    setSideTab("transcript");
    setBoardOpen(true);
    setSummaryLoading(true);
    window.setTimeout(() => {
      setTranscript((t) => ({
        ...t,
        summary: generateTranscriptSummary(session, t.lines),
        summarizedAt: new Date().toISOString(),
      }));
      setSummaryLoading(false);
    }, 3000);
  };

  const sendForApproval = () => {
    setApprovalStatus("pending");
  };

  const confirmLeave = useCallback(() => {
    const status: BoardApprovalStatus = approvalStatus === "pending" ? "pending" : "draft";
    onEnd({ board, transcript, approvalStatus: status });
    setLeaveModalOpen(false);
  }, [approvalStatus, board, onEnd, transcript]);

  const leave = () => {
    if (approvalStatus !== "pending") {
      setLeaveModalOpen(true);
      return;
    }
    confirmLeave();
  };

  const openBoard = (tab: SideTab = "board") => {
    setSideTab(tab);
    setBoardOpen(true);
  };

  const handleCopyToBoard = (next: MeetingBoard) => {
    setBoard(next);
    setBoardToast(true);
    window.setTimeout(() => setBoardToast(false), 2500);
  };

  const transcriptPhase = summaryLoading
    ? "loading"
    : transcript.summary
      ? "chatbot"
      : transcriptOn
        ? "live"
        : "idle";

  return (
    <>
      <div className="fixed inset-0 z-[60] flex flex-col bg-gray-950 lg:flex-row">
        <div
          className={cn(
            "relative flex min-h-0 flex-1 flex-col bg-gray-900 lg:min-h-0",
            boardOpen ? "lg:w-[70%]" : "lg:w-full"
          )}
        >
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

          <AiTranscriptBanner />

          <div className="mx-4 mt-2 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-xs text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
            This meeting is being recorded.
          </div>

          <div className="flex min-h-0 flex-1 px-3 py-3 sm:px-4">
            <div className="grid h-full w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <ParticipantTile
                name={session.managerName}
                role={session.role}
                avatar={manager?.avatar}
                highlight
              />
              <ParticipantTile
                name={goBy}
                role={currentUser.designation}
                avatar={currentUser.avatar}
                muted={muted}
                videoOn={videoOn}
              />
            </div>
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
            <Control
              icon={<Grid01 />}
              label="Board"
              active={boardOpen}
              onClick={() => setBoardOpen((open) => !open)}
              ariaLabel="Toggle session board"
            />
            <Control icon={<Users01 />} label="Participants" />
            <Control
              icon={<MessageCircle01 />}
              label="Chat"
              active={boardOpen && sideTab === "chat"}
              onClick={() => openBoard("chat")}
            />
            <Control icon={<Share07 />} label="Share" />
            <Control
              icon={<Stars02 />}
              label="Stop transcript"
              active={transcriptOn}
              disabled={!transcriptOn}
              onClick={stopTranscript}
            />
            <Control icon={<DotsHorizontal />} label="More" />
            <div className="mx-1 h-8 w-px bg-white/10" aria-hidden />
            <button
              type="button"
              onClick={leave}
              aria-label="Leave meeting"
              className="flex min-w-[72px] flex-col items-center gap-1 rounded-lg border border-transparent bg-error-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-error-700 focus:outline-none focus-visible:border-error-300"
            >
              <LogOut01 className="h-5 w-5" aria-hidden />
              Leave
            </button>
          </div>

          {boardToast ? (
            <div
              role="status"
              className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white"
            >
              Added to session board
            </div>
          ) : null}
        </div>

        {boardOpen ? (
          <div className="relative flex w-full flex-col overflow-hidden border-l border-gray-200 bg-gray-50 lg:w-[30%]">
            <div className="border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between px-5 py-2">
                {transcriptOn ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
                    <Stars02 className="h-3.5 w-3.5" />
                    AI transcribing in background
                  </span>
                ) : transcript.summary ? (
                  <span className="text-xs text-gray-500">Transcript summarised</span>
                ) : (
                  <span className="text-xs text-gray-500">Transcript stopped</span>
                )}
                <button
                  onClick={() => setBoardOpen(false)}
                  className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close session board"
                >
                  <XClose className="h-4 w-4" />
                </button>
              </div>
              <div className="flex px-3" role="tablist" aria-label="Meeting sidebar">
                {(
                  [
                    { id: "board" as const, label: "Session board" },
                    { id: "chat" as const, label: "Chat" },
                    { id: "transcript" as const, label: "Transcript" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={sideTab === tab.id}
                    onClick={() => setSideTab(tab.id)}
                    className={cn(
                      "border-b-2 px-3 py-2.5 text-sm transition-colors focus:outline-none focus-visible:border-brand-500",
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

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden" role="tabpanel">
              {sideTab === "board" ? (
                <>
                  <div className="flex-1 overflow-y-auto p-5 pb-20">
                    <MeetingBoardPanel
                      session={session}
                      board={board}
                      editable={!boardLocked}
                      variant="live"
                      onChange={setBoard}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-5 py-3">
                    {boardLocked ? (
                      <p className="text-center text-xs text-gray-500">
                        Approval request sent to your manager
                      </p>
                    ) : (
                      <Button
                        variant="primary"
                        className="ml-auto w-full sm:w-auto sm:float-right"
                        onClick={sendForApproval}
                      >
                        Send for approval
                      </Button>
                    )}
                  </div>
                </>
              ) : sideTab === "chat" ? (
                <MeetingChatPanel session={session} />
              ) : transcriptPhase === "loading" ? (
                <TranscriptSummaryLoading />
              ) : transcriptPhase === "chatbot" ? (
                <TranscriptChatbotPanel
                  session={session}
                  transcript={transcript}
                  board={board}
                  onApplyBoard={handleCopyToBoard}
                  onUpdateTranscript={setTranscript}
                />
              ) : (
                <LiveTranscriptPanel
                  lines={transcript.lines}
                  isLive={transcriptOn}
                  listening={transcriptListening}
                  typingLine={typingLine}
                  typedText={typedText}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>

      <LeaveWithoutApprovalModal
        open={leaveModalOpen}
        onCancel={() => setLeaveModalOpen(false)}
        onConfirm={confirmLeave}
      />

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
