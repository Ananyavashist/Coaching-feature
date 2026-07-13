import { useState } from "react";
import {
  Stars02,
  SearchSm,
  ThumbsUp,
  ThumbsDown,
  Copy01,
  ArrowUp,
} from "@untitledui/icons";
import {
  answerTranscriptQuestion,
  type CoachingSession,
  type MeetingBoard,
  type MeetingTranscript,
  type TranscriptChatMessage,
  type TranscriptSummaryBullet,
} from "../../../data/dashboard";
import { CopyToBoardMenu } from "./CopyToBoardMenu";
import { TranscriptSourcePopover } from "./TranscriptSourcePopover";
import { TranscriptSummaryView } from "./TranscriptSummaryView";

function ChatBullet({
  bullet,
  session,
  board,
  onApplyBoard,
  showCopy,
}: {
  bullet: TranscriptSummaryBullet;
  session: CoachingSession;
  board?: MeetingBoard;
  onApplyBoard?: (board: MeetingBoard) => void;
  showCopy?: boolean;
}) {
  const [source, setSource] = useState<TranscriptSummaryBullet | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  return (
    <li className="group flex items-start gap-2 rounded-lg border border-transparent px-2 py-1.5 text-sm leading-relaxed text-gray-700 hover:border-gray-100 hover:bg-gray-50">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
      <span className="flex-1">{bullet.text}</span>
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={(e) => {
            setSource(bullet);
            setAnchor(e.currentTarget.getBoundingClientRect());
          }}
          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="View transcript source"
        >
          <SearchSm className="h-3.5 w-3.5" />
        </button>
        {showCopy && board && onApplyBoard ? (
          <CopyToBoardMenu
            text={bullet.text}
            session={session}
            board={board}
            onApply={onApplyBoard}
          />
        ) : null}
      </div>
      {source ? (
        <TranscriptSourcePopover
          bullet={source}
          anchorRect={anchor}
          onClose={() => setSource(null)}
        />
      ) : null}
    </li>
  );
}

function AssistantBlock({
  message,
  session,
  board,
  onApplyBoard,
  showCopy,
}: {
  message: TranscriptChatMessage;
  session: CoachingSession;
  board?: MeetingBoard;
  onApplyBoard?: (board: MeetingBoard) => void;
  showCopy?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700">
          <Stars02 className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {message.intro ? (
            <p className="text-sm font-semibold text-gray-900">{message.intro}</p>
          ) : null}
          {message.bullets?.length ? (
            <ul className="space-y-1">
              {message.bullets.map((b) => (
                <ChatBullet
                  key={b.id}
                  bullet={b}
                  session={session}
                  board={board}
                  onApplyBoard={onApplyBoard}
                  showCopy={showCopy}
                />
              ))}
            </ul>
          ) : null}
          <div className="flex items-center gap-1 pt-1">
            <button type="button" className="rounded p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Helpful">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button type="button" className="rounded p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Not helpful">
              <ThumbsDown className="h-4 w-4" />
            </button>
            <button type="button" className="rounded p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Copy response">
              <Copy01 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TranscriptChatbotPanel({
  session,
  transcript,
  board,
  onApplyBoard,
  onUpdateTranscript,
  showCopy = true,
  readOnly = false,
}: {
  session: CoachingSession;
  transcript: MeetingTranscript;
  board?: MeetingBoard;
  onApplyBoard?: (board: MeetingBoard) => void;
  onUpdateTranscript?: (t: MeetingTranscript) => void;
  showCopy?: boolean;
  readOnly?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const hasSummary = !!transcript.summary?.length;
  const chatHistory = transcript.chatHistory ?? [];

  const ask = () => {
    const q = draft.trim();
    if (!q || thinking) return;
    setDraft("");
    setThinking(true);

    const userMsg: TranscriptChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      question: q,
    };

    window.setTimeout(() => {
      const answer = answerTranscriptQuestion(session, transcript, q);
      const next: MeetingTranscript = {
        ...transcript,
        chatHistory: [...chatHistory, userMsg, answer],
      };
      onUpdateTranscript?.(next);
      setThinking(false);
    }, 800);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {hasSummary ? (
          <TranscriptSummaryView
            session={session}
            sections={transcript.summary!}
            board={board}
            onApplyBoard={onApplyBoard}
            showCopy={showCopy && !readOnly}
          />
        ) : null}

        {chatHistory.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-gray-900 px-3.5 py-2.5 text-sm text-white">
                {m.question}
              </p>
            </div>
          ) : (
            <AssistantBlock
              key={m.id}
              message={m}
              session={session}
              board={board}
              onApplyBoard={onApplyBoard}
              showCopy={showCopy && !readOnly}
            />
          )
        )}

        {thinking ? (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700">
              <Stars02 className="h-4 w-4 animate-pulse text-white" />
            </div>
            <p className="text-sm text-gray-500">Searching transcript…</p>
          </div>
        ) : null}
      </div>

      {!readOnly && hasSummary ? (
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="relative">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  ask();
                }
              }}
              placeholder="Ask anything…"
              aria-label="Ask about the transcript"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={ask}
              disabled={!draft.trim() || thinking}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40"
              aria-label="Send question"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-400">
            Transcript Assist can make mistakes. Verify results.
          </p>
        </div>
      ) : null}
    </div>
  );
}
