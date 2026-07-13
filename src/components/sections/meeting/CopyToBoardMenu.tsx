import { useState, useRef, useEffect } from "react";
import { Copy01, Plus } from "@untitledui/icons";
import { bid, currentUser, type MeetingBoard, type CoachingSession } from "../../../data/dashboard";

type Target = "milestone" | "task" | "notes" | "problem";

const targets: { id: Target; label: string }[] = [
  { id: "milestone", label: "Milestone" },
  { id: "task", label: "Task" },
  { id: "notes", label: "Notes" },
  { id: "problem", label: "Problem statement" },
];

export function CopyToBoardMenu({
  text,
  session,
  board,
  onApply,
}: {
  text: string;
  session: CoachingSession;
  board: MeetingBoard;
  onApply: (board: MeetingBoard) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const apply = (target: Target) => {
    const next = { ...board };
    if (target === "milestone") {
      next.milestones = [
        ...board.milestones,
        {
          id: bid("m"),
          text,
          owner: currentUser.name,
          checkIn: session.date,
          done: false,
        },
      ];
    } else if (target === "task") {
      next.tasks = [
        ...board.tasks,
        {
          id: bid("t"),
          text,
          owner: currentUser.name,
          due: session.date,
          done: false,
        },
      ];
    } else if (target === "notes") {
      next.notes = board.notes.trim() ? `${board.notes}\n• ${text}` : `• ${text}`;
    } else {
      next.problemStatement = board.problemStatement.trim()
        ? `${board.problemStatement}\n${text}`
        : text;
    }
    onApply(next);
    setOpen(false);
  };

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Copy to session board"
      >
        <Copy01 className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-lg border border-gray-200 bg-white py-1">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Add to board
          </p>
          {targets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => apply(t.id)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-3.5 w-3.5 text-gray-400" />
              {t.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
