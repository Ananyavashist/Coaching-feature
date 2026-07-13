import type { ReactNode } from "react";
import {
  Target04,
  AlignLeft01,
  Lightbulb02,
  Flag01,
  Calendar,
  VideoRecorder,
  CheckSquare,
  Scales02,
  Users01,
  FileCheck02,
  Stars02,
  Plus,
  Trash01,
} from "@untitledui/icons";
import { Badge } from "../ui/Badge";
import { Select } from "../ui/Select";
import { cn } from "../../lib/utils";
import {
  bid,
  type MeetingBoard,
  type BoardMilestone,
  type BoardTask,
  type CoachingSession,
} from "../../data/dashboard";

const sessionTypeOptions = [
  { value: "first", label: "First session" },
  { value: "follow-up", label: "Follow-up" },
];
const formatOptions = [
  { value: "remote", label: "Remote" },
  { value: "in-person", label: "In-person" },
];
const alignmentOptions = [
  { value: "agreed", label: "Aligned" },
  { value: "open", label: "Open disagreement" },
];
const attendanceOptions = [
  { value: "both-present", label: "Both present" },
  { value: "no-show", label: "No-show" },
  { value: "rescheduled", label: "Rescheduled" },
];

const labelFor = (opts: { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;

function Card({
  icon,
  title,
  accent,
  children,
}: {
  icon: ReactNode;
  title: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className={cn("text-gray-500", accent && "text-brand-600")}>{icon}</span>
        <h4
          className={cn(
            "text-base font-semibold text-gray-900",
            accent && "text-brand-700"
          )}
        >
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function TextBlock({
  value,
  editable,
  placeholder,
  onChange,
  rows = 3,
}: {
  value: string;
  editable: boolean;
  placeholder?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  if (!editable) {
    return value ? (
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{value}</p>
    ) : (
      <p className="text-sm italic text-gray-400">{placeholder ?? "Not captured yet"}</p>
    );
  }
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
    />
  );
}

function MetaChip({
  value,
  options,
  editable,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  editable: boolean;
  onChange: (v: string) => void;
}) {
  if (!editable) return <Badge tone="gray">{labelFor(options, value)}</Badge>;
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      className="w-48"
    />
  );
}

export function MeetingBoardPanel({
  session,
  board,
  editable,
  onChange,
  variant = "standard",
}: {
  session: CoachingSession;
  board: MeetingBoard;
  editable: boolean;
  onChange?: (board: MeetingBoard) => void;
  /** Live call: reference-only carried-in, no meta fields. */
  variant?: "live" | "standard";
}) {
  const update = (patch: Partial<MeetingBoard>) => onChange?.({ ...board, ...patch });
  const isLive = variant === "live";
  const carriedEditable = editable && !isLive;
  const capturedEditable = editable;

  const setMilestone = (id: string, patch: Partial<BoardMilestone>) =>
    update({
      milestones: board.milestones.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    });
  const setTask = (id: string, patch: Partial<BoardTask>) =>
    update({ tasks: board.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) });

  const ownerOptions = [
    { value: session.managerName, label: session.managerName },
    { value: "Bonnie Green", label: "Bonnie Green" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-semibold leading-7 text-gray-900">
            Coaching Session with {session.managerName}
          </h3>
        </div>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-500">
          This board is shared between you and {session.managerName}
        </p>
      </div>

      {/* ---------------- Carried into the meeting ---------------- */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Carried into the meeting
        </p>
        <div className="space-y-4">
          <Card icon={<Target04 className="h-4.5 w-4.5" />} title="Current Challenge">
            <TextBlock
              value={board.challenge}
              editable={carriedEditable}
              onChange={(v) => update({ challenge: v })}
              rows={2}
            />
          </Card>

          <Card icon={<AlignLeft01 className="h-4.5 w-4.5" />} title="Description">
            <TextBlock
              value={board.description}
              editable={carriedEditable}
              onChange={(v) => update({ description: v })}
              rows={4}
            />
            {board.attachedPatterns.length > 0 ? (
              <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                <p className="text-xs font-medium text-gray-500">Attached patterns</p>
                {board.attachedPatterns.map((p) => (
                  <div key={p.id}>
                    <Badge tone={p.tone}>{p.tag}</Badge>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{p.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </Card>

          <Card icon={<Lightbulb02 className="h-4.5 w-4.5" />} title="Desired outcome">
            <TextBlock
              value={board.desiredOutcome}
              editable={carriedEditable}
              onChange={(v) => update({ desiredOutcome: v })}
              rows={2}
            />
          </Card>

          {!isLive ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Session type</span>
                <MetaChip
                  value={board.sessionType}
                  options={sessionTypeOptions}
                  editable={editable}
                  onChange={(v) => update({ sessionType: v as MeetingBoard["sessionType"] })}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Format</span>
                <MetaChip
                  value={board.format}
                  options={formatOptions}
                  editable={editable}
                  onChange={(v) => update({ format: v as MeetingBoard["format"] })}
                />
              </div>
            </div>
          ) : null}

          {!isLive && board.sessionType === "follow-up" ? (
            <>
              {board.previousSummary ? (
                <Card
                  icon={<VideoRecorder className="h-4.5 w-4.5" />}
                  title="Previous session summary"
                  accent
                >
                  <TextBlock
                    value={board.previousSummary}
                    editable={editable}
                    onChange={(v) => update({ previousSummary: v })}
                    rows={3}
                  />
                </Card>
              ) : null}

              {board.priorItems.length > 0 ? (
                <Card icon={<Flag01 className="h-4.5 w-4.5" />} title="Prior milestones / tasks">
                  <ul className="space-y-2.5">
                    {board.priorItems.map((it) => (
                      <li key={it.id} className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={it.done}
                          disabled={!editable}
                          onChange={(e) =>
                            update({
                              priorItems: board.priorItems.map((x) =>
                                x.id === it.id ? { ...x, done: e.target.checked } : x
                              ),
                            })
                          }
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600"
                        />
                        <span
                          className={cn(
                            "text-sm text-gray-700",
                            it.done && "text-gray-400 line-through"
                          )}
                        >
                          {it.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}
            </>
          ) : null}

        </div>
      </div>

      {/* ---------------- Captured during / after ---------------- */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Captured during / after
        </p>
        <div className="space-y-4">
          <Card icon={<Target04 className="h-4.5 w-4.5" />} title="Agreed problem statement">
            <TextBlock
              value={board.problemStatement}
              editable={capturedEditable}
              placeholder="Agree on the anchor problem everything points back to."
              onChange={(v) => update({ problemStatement: v })}
              rows={2}
            />
          </Card>

          {!isLive ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Scales02 className="h-4.5 w-4.5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-900">Alignment</span>
                <MetaChip
                  value={board.alignment}
                  options={alignmentOptions}
                  editable={editable}
                  onChange={(v) => update({ alignment: v as MeetingBoard["alignment"] })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Users01 className="h-4.5 w-4.5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-900">Attendance</span>
                <MetaChip
                  value={board.attendance}
                  options={attendanceOptions}
                  editable={editable}
                  onChange={(v) => update({ attendance: v as MeetingBoard["attendance"] })}
                />
              </div>
            </div>
          ) : null}

          <Card icon={<Flag01 className="h-4.5 w-4.5" />} title="Milestones">
            <ListEditor
              rows={board.milestones}
              editable={capturedEditable}
              ownerOptions={ownerOptions}
              dateLabel="Check-in"
              getDate={(m) => m.checkIn}
              setDate={(id, v) => setMilestone(id, { checkIn: v })}
              onToggle={(id, done) => setMilestone(id, { done })}
              onText={(id, v) => setMilestone(id, { text: v })}
              onOwner={(id, v) => setMilestone(id, { owner: v })}
              onRemove={(id) =>
                update({ milestones: board.milestones.filter((m) => m.id !== id) })
              }
              onAdd={() =>
                update({
                  milestones: [
                    ...board.milestones,
                    {
                      id: bid("m"),
                      text: "",
                      owner: session.managerName,
                      checkIn: session.date,
                      done: false,
                    },
                  ],
                })
              }
            />
          </Card>

          <Card icon={<CheckSquare className="h-4.5 w-4.5" />} title="Tasks">
            <ListEditor
              rows={board.tasks}
              editable={capturedEditable}
              ownerOptions={ownerOptions}
              dateLabel="Due"
              getDate={(t) => t.due}
              setDate={(id, v) => setTask(id, { due: v })}
              onToggle={(id, done) => setTask(id, { done })}
              onText={(id, v) => setTask(id, { text: v })}
              onOwner={(id, v) => setTask(id, { owner: v })}
              onRemove={(id) => update({ tasks: board.tasks.filter((t) => t.id !== id) })}
              onAdd={() =>
                update({
                  tasks: [
                    ...board.tasks,
                    {
                      id: bid("t"),
                      text: "",
                      owner: "Bonnie Green",
                      due: session.date,
                      done: false,
                    },
                  ],
                })
              }
            />
          </Card>

          {!isLive ? (
          <Card icon={<Calendar className="h-4.5 w-4.5" />} title="AI-suggested agenda">
            <p className="mb-2 text-xs italic text-gray-400">
              Suggested starting point — edit as needed.
            </p>
            {capturedEditable ? (
              <textarea
                value={board.aiAgenda.join("\n")}
                rows={4}
                onChange={(e) => update({ aiAgenda: e.target.value.split("\n") })}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
              />
            ) : (
              <ul className="space-y-1.5">
                {board.aiAgenda.filter(Boolean).map((a, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          ) : null}

          <Card icon={<FileCheck02 className="h-4.5 w-4.5" />} title="Session notes">
            {!isLive && capturedEditable ? (
              <p className="mb-2 flex items-center gap-1.5 text-xs italic text-gray-400">
                <Stars02 className="h-3.5 w-3.5" />
                AI drafts these when you stop the transcript — review before saving.
              </p>
            ) : null}
            <TextBlock
              value={board.notes}
              editable={capturedEditable}
              placeholder="Notes are drafted from the call for remote sessions, or typed for in-person — reviewed before saving."
              onChange={(v) => update({ notes: v })}
              rows={5}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

type Row = { id: string; text: string; owner: string; done: boolean };

function ListEditor<T extends Row>({
  rows,
  editable,
  ownerOptions,
  dateLabel,
  getDate,
  setDate,
  onToggle,
  onText,
  onOwner,
  onRemove,
  onAdd,
}: {
  rows: T[];
  editable: boolean;
  ownerOptions: { value: string; label: string }[];
  dateLabel: string;
  getDate: (row: T) => string;
  setDate: (id: string, v: string) => void;
  onToggle: (id: string, done: boolean) => void;
  onText: (id: string, v: string) => void;
  onOwner: (id: string, v: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  if (rows.length === 0 && !editable) {
    return <p className="text-sm italic text-gray-400">None yet</p>;
  }
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="rounded-lg border border-gray-200 p-3">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              checked={r.done}
              disabled={!editable}
              onChange={(e) => onToggle(r.id, e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600"
            />
            <div className="min-w-0 flex-1">
              {editable ? (
                <input
                  value={r.text}
                  onChange={(e) => onText(r.id, e.target.value)}
                  placeholder="Describe the item"
                  className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
                />
              ) : (
                <p
                  className={cn(
                    "text-sm text-gray-700",
                    r.done && "text-gray-400 line-through"
                  )}
                >
                  {r.text}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {editable ? (
                  <>
                    <Select
                      options={ownerOptions}
                      value={r.owner}
                      onChange={(v) => onOwner(r.id, v)}
                      className="w-40"
                    />
                    <input
                      value={getDate(r)}
                      onChange={(e) => setDate(r.id, e.target.value)}
                      placeholder={dateLabel}
                      className="h-10 w-40 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
                    />
                  </>
                ) : (
                  <>
                    <Badge tone="gray">{r.owner}</Badge>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {dateLabel}: {getDate(r)}
                    </span>
                  </>
                )}
              </div>
            </div>
            {editable ? (
              <button
                onClick={() => onRemove(r.id)}
                className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-error-600"
                aria-label="Remove"
              >
                <Trash01 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      ))}
      {editable ? (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          Add {dateLabel === "Due" ? "task" : "milestone"}
        </button>
      ) : null}
    </div>
  );
}
