import { useState } from "react";
import { SearchSm } from "@untitledui/icons";
import type {
  CoachingSession,
  MeetingBoard,
  TranscriptSummarySection,
  TranscriptSummaryBullet,
} from "../../../data/dashboard";
import { CopyToBoardMenu } from "./CopyToBoardMenu";
import { TranscriptSourcePopover } from "./TranscriptSourcePopover";

function SummaryBullet({
  bullet,
  session,
  board,
  onApplyBoard,
  showCopy,
}: {
  bullet: TranscriptSummaryBullet;
  session: CoachingSession;
  board: MeetingBoard;
  onApplyBoard?: (board: MeetingBoard) => void;
  showCopy?: boolean;
}) {
  const [source, setSource] = useState<TranscriptSummaryBullet | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  return (
    <li className="group flex items-start gap-2 text-sm leading-relaxed text-gray-700">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
      <span className="flex-1">{bullet.text}</span>
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
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
        {showCopy && onApplyBoard ? (
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

export function TranscriptSummaryView({
  session,
  sections,
  board,
  onApplyBoard,
  showCopy = true,
}: {
  session: CoachingSession;
  sections: TranscriptSummarySection[];
  board?: MeetingBoard;
  onApplyBoard?: (board: MeetingBoard) => void;
  showCopy?: boolean;
}) {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h2 className="font-serif text-xl font-semibold text-gray-900">
          Coaching session with {session.managerName}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
            {session.date}
          </span>
          <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
            {session.timeSlot.split(",")[0]}
          </span>
        </div>
      </div>

      {sections.map((section) => (
        <section key={section.id}>
          <h3 className="text-sm font-semibold text-gray-900">
            <span className="mr-1.5 text-gray-400">#</span>
            {section.heading}
          </h3>
          <ul className="mt-2 space-y-2 pl-1">
            {section.bullets.map((b) => (
              <SummaryBullet
                key={b.id}
                bullet={b}
                session={session}
                board={board ?? ({} as MeetingBoard)}
                onApplyBoard={onApplyBoard}
                showCopy={showCopy && !!board && !!onApplyBoard}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
