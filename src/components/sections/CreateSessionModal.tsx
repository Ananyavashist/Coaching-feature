import { useEffect, useMemo, useRef, useState } from "react";
import { XClose, Plus, Flag01, ArrowUpRight, CheckSquare } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Select, type SelectOption } from "../ui/Select";
import { FloatingOverlayBackdrop, FloatingOverlayPanel } from "../ui/FloatingOverlay";
import { useClickOutside } from "../../lib/useClickOutside";
import {
  coaches,
  timeSlots,
  priorities,
  sessionDates,
  feedbackPatterns,
  bid,
  currentUser,
  type BoardMilestone,
  type BoardTask,
  type CoachingSession,
  type MeetingBoard,
  type SuggestionPattern,
} from "../../data/dashboard";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-gray-900">
      {children}
      {required ? <span className="text-error-500"> *</span> : null}
    </label>
  );
}

type PickableItem = {
  id: string;
  kind: "milestone" | "task";
  text: string;
  detail: string;
  source: "current" | "previous";
  milestone?: BoardMilestone;
  task?: BoardTask;
};

function buildPickableItems(
  board: MeetingBoard | undefined,
  source: "current" | "previous"
): PickableItem[] {
  if (!board) return [];
  const items: PickableItem[] = [];

  board.milestones.forEach((m) => {
    if (!m.text.trim()) return;
    items.push({
      id: `${source}-m-${m.id}`,
      kind: "milestone",
      text: m.text,
      detail: `${m.owner}, check in ${m.checkIn}`,
      source,
      milestone: m,
    });
  });

  board.tasks.forEach((t) => {
    if (!t.text.trim()) return;
    items.push({
      id: `${source}-t-${t.id}`,
      kind: "task",
      text: t.text,
      detail: `${t.owner}, due ${t.due}`,
      source,
      task: t,
    });
  });

  board.priorItems.forEach((p) => {
    if (!p.text.trim()) return;
    items.push({
      id: `${source}-p-${p.id}`,
      kind: "milestone",
      text: p.text,
      detail: "From prior meeting checklist",
      source,
      milestone: {
        id: p.id,
        text: p.text,
        owner: currentUser.name,
        checkIn: "",
        done: p.done,
      },
    });
  });

  return items;
}

function DiscussItemsSection({
  title,
  items,
  selectedIds,
  onToggle,
}: {
  title: string;
  items: PickableItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => onToggle(item.id)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  {item.kind === "milestone" ? (
                    <Flag01 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  ) : (
                    <CheckSquare className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900">{item.text}</span>
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">{item.detail}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CreateSessionModal({
  open,
  onClose,
  defaultManagerId,
  currentBoard,
  previousBoard,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  defaultManagerId?: string;
  currentBoard?: MeetingBoard;
  previousBoard?: MeetingBoard;
  onSubmit: (session: CoachingSession) => void;
}) {
  const [recipient, setRecipient] = useState(defaultManagerId ?? coaches[0].id);
  const [date, setDate] = useState(sessionDates[0]);
  const [slot, setSlot] = useState(timeSlots[0]);
  const [agenda, setAgenda] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [priority, setPriority] = useState("medium");
  const [suggestions, setSuggestions] = useState<SuggestionPattern[]>([]);
  const [addMoreOpen, setAddMoreOpen] = useState(false);
  const [selectedDiscussIds, setSelectedDiscussIds] = useState<Set<string>>(new Set());
  const [customMilestone, setCustomMilestone] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [customMilestones, setCustomMilestones] = useState<BoardMilestone[]>([]);
  const [customTasks, setCustomTasks] = useState<BoardTask[]>([]);
  const addMoreRef = useRef<HTMLDivElement>(null);
  useClickOutside(addMoreRef, () => setAddMoreOpen(false), addMoreOpen);

  const currentItems = useMemo(
    () => buildPickableItems(currentBoard, "current"),
    [currentBoard]
  );
  const previousItems = useMemo(
    () => buildPickableItems(previousBoard, "previous"),
    [previousBoard]
  );
  const allPickable = useMemo(
    () => [...currentItems, ...previousItems],
    [currentItems, previousItems]
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      if (defaultManagerId) setRecipient(defaultManagerId);
      setSuggestions([]);
      setAgenda("");
      setGoals([]);
      setNewGoal("");
      setSelectedDiscussIds(new Set());
      setCustomMilestone("");
      setCustomTask("");
      setCustomMilestones([]);
      setCustomTasks([]);
    }
  }, [open, defaultManagerId]);

  const coach = coaches.find((c) => c.id === recipient)!;

  const recipientOptions: SelectOption[] = coaches.map((c) => ({
    value: c.id,
    label: c.name,
    leading: <img src={c.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />,
    trailing: (
      <span className="ml-1 shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
        {c.designation}
      </span>
    ),
  }));

  const dateOptions: SelectOption[] = sessionDates.map((d) => ({ value: d, label: d }));
  const slotOptions: SelectOption[] = timeSlots.map((t) => ({ value: t, label: t }));
  const priorityOptions: SelectOption[] = priorities.map((p) => ({
    value: p.id,
    label: p.label,
    leading: (
      <Badge tone={p.tone}>
        <Flag01 className="mr-1 h-3 w-3" />
        {p.label}
      </Badge>
    ),
  }));
  const activePriority = priorities.find((p) => p.id === priority)!;

  const availableActions = feedbackPatterns.filter(
    (f) => !suggestions.some((s) => s.id === f.id)
  );

  const toggleDiscussItem = (id: string) => {
    setSelectedDiscussIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addSuggestion = (id: string) => {
    const f = feedbackPatterns.find((x) => x.id === id);
    if (!f) return;
    setSuggestions((prev) => [
      ...prev,
      { id: f.id, tag: f.category, tone: f.tone, text: f.detail },
    ]);
    setAddMoreOpen(false);
  };

  const removeSuggestion = (id: string) =>
    setSuggestions((prev) => prev.filter((s) => s.id !== id));

  const addGoal = () => {
    const v = newGoal.trim();
    if (!v) return;
    setGoals((g) => [...g, v]);
    setNewGoal("");
  };

  const addCustomMilestone = () => {
    const text = customMilestone.trim();
    if (!text) return;
    setCustomMilestones((prev) => [
      ...prev,
      {
        id: bid("m"),
        text,
        owner: currentUser.name,
        checkIn: date,
        done: false,
      },
    ]);
    setCustomMilestone("");
  };

  const addCustomTask = () => {
    const text = customTask.trim();
    if (!text) return;
    setCustomTasks((prev) => [
      ...prev,
      {
        id: bid("t"),
        text,
        owner: currentUser.name,
        due: date,
        done: false,
      },
    ]);
    setCustomTask("");
  };

  const handleSubmit = () => {
    if (!agenda.trim()) return;

    const pickedMilestones = allPickable
      .filter((item) => selectedDiscussIds.has(item.id) && item.kind === "milestone" && item.milestone)
      .map((item) => ({ ...item.milestone! }));
    const pickedTasks = allPickable
      .filter((item) => selectedDiscussIds.has(item.id) && item.kind === "task" && item.task)
      .map((item) => ({ ...item.task! }));

    onSubmit({
      id: `cs-${Date.now()}`,
      managerId: coach.id,
      managerName: coach.name,
      role: coach.designation,
      date,
      timeSlot: slot,
      priorityId: priority,
      description: agenda.trim(),
      category: suggestions[0]?.tag ?? "Engineering Excellence",
      suggestions,
      goals,
      discussMilestones: [...pickedMilestones, ...customMilestones],
      discussTasks: [...pickedTasks, ...customTasks],
      status: "pending",
      createdDuringMeeting: true,
      submittedViaForm: true,
    });
    onClose();
  };

  const hasDiscussSection =
    currentItems.length > 0 ||
    previousItems.length > 0 ||
    customMilestones.length > 0 ||
    customTasks.length > 0;

  return (
    <>
      <FloatingOverlayBackdrop open={open} onClose={onClose} zIndex={70} />

      <FloatingOverlayPanel
        open={open}
        side="center"
        ariaLabel="Schedule a new coaching session"
        zIndex={71}
        className="w-[min(calc(100vw-2rem),850px)] max-w-[850px] max-h-[min(720px,calc(100vh-2rem))]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Schedule a new coaching session
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <XClose className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div>
            <Label required>Send this request to</Label>
            <Select options={recipientOptions} value={recipient} onChange={setRecipient} size="lg" />
          </div>

          <div>
            <Label required>Date</Label>
            <Select options={dateOptions} value={date} onChange={setDate} size="lg" />
          </div>

          <div>
            <Label required>Select the time-slot</Label>
            <Select options={slotOptions} value={slot} onChange={setSlot} size="lg" />
          </div>

          <div>
            <Label required>Need help with Suggestion and patterns</Label>
            {suggestions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                No patterns added yet. Use “Add more” to choose the feedback you want coaching on.
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((s) => (
                  <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <Badge tone={s.tone}>{s.tag}</Badge>
                      <button
                        onClick={() => removeSuggestion(s.id)}
                        className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Remove suggestion"
                      >
                        <XClose className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div ref={addMoreRef} className="relative mt-3 inline-block">
              <Button
                variant="secondary-color"
                size="sm"
                onClick={() => setAddMoreOpen((o) => !o)}
                disabled={availableActions.length === 0}
              >
                Add more
                <Plus className="h-4.5 w-4.5" />
              </Button>

              {addMoreOpen && availableActions.length > 0 ? (
                <ul className="absolute left-0 z-50 mt-1.5 w-72 max-w-[80vw] overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
                  {availableActions.map((f) => (
                    <li key={f.id}>
                      <button
                        onClick={() => addSuggestion(f.id)}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4 shrink-0 text-gray-400" />
                        <span className="flex flex-col">
                          <span className="font-medium text-gray-900">{f.label}</span>
                          <span className="text-xs text-gray-500">{f.category}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div>
            <Label>Milestones and tasks to discuss</Label>
            <p className="mb-3 text-sm text-gray-500">
              Select items from this meeting or a previous session to carry into the next coaching
              call.
            </p>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <DiscussItemsSection
                title="From this meeting"
                items={currentItems}
                selectedIds={selectedDiscussIds}
                onToggle={toggleDiscussItem}
              />
              <DiscussItemsSection
                title="From previous meeting"
                items={previousItems}
                selectedIds={selectedDiscussIds}
                onToggle={toggleDiscussItem}
              />

              {!hasDiscussSection ? (
                <p className="text-sm text-gray-500">
                  No milestones or tasks captured yet. Add your own below.
                </p>
              ) : null}

              {customMilestones.length > 0 ? (
                <ul className="space-y-2">
                  {customMilestones.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
                    >
                      <span className="flex items-center gap-1.5">
                        <Flag01 className="h-3.5 w-3.5 text-gray-400" />
                        {m.text}
                      </span>
                      <button
                        onClick={() =>
                          setCustomMilestones((prev) => prev.filter((x) => x.id !== m.id))
                        }
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                        aria-label="Remove milestone"
                      >
                        <XClose className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {customTasks.length > 0 ? (
                <ul className="space-y-2">
                  {customTasks.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckSquare className="h-3.5 w-3.5 text-gray-400" />
                        {t.text}
                      </span>
                      <button
                        onClick={() => setCustomTasks((prev) => prev.filter((x) => x.id !== t.id))}
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                        aria-label="Remove task"
                      >
                        <XClose className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="space-y-2 border-t border-gray-200 pt-3">
                <div className="flex items-center gap-2">
                  <input
                    value={customMilestone}
                    onChange={(e) => setCustomMilestone(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomMilestone();
                      }
                    }}
                    placeholder="Add a milestone for the next meeting"
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    onClick={addCustomMilestone}
                    className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Add milestone"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={customTask}
                    onChange={(e) => setCustomTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTask();
                      }
                    }}
                    placeholder="Add a task for the next meeting"
                    className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    onClick={addCustomTask}
                    className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Add task"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label required>Add session agenda</Label>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              rows={4}
              placeholder="What would you like to cover in the follow-up session?"
              className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <Label>Meeting Goals</Label>
            {goals.map((g, i) => (
              <div key={i} className="mb-2 flex items-center gap-2">
                <input
                  value={g}
                  readOnly
                  className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 text-sm text-gray-700"
                />
                <button
                  onClick={() => setGoals((prev) => prev.filter((_, idx) => idx !== i))}
                  className="shrink-0 rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                  aria-label="Remove goal"
                >
                  <XClose className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addGoal();
                  }
                }}
                placeholder="Add notes"
                className="h-11 w-full rounded-lg border border-gray-300 px-3.5 text-sm text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
              />
              <button
                onClick={addGoal}
                className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Add goal"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <Label>Priority</Label>
            <Select
              options={priorityOptions}
              value={priority}
              onChange={setPriority}
              size="lg"
              renderValue={() => (
                <Badge tone={activePriority.tone}>
                  <Flag01 className="mr-1 h-3 w-3" />
                  {activePriority.label}
                </Badge>
              )}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            Will show as pending until {coach.name} responds
          </p>
          <Button className="w-full sm:w-auto" onClick={handleSubmit} disabled={!agenda.trim()}>
            Schedule Session
            <ArrowUpRight className="h-4.5 w-4.5" />
          </Button>
        </div>
      </FloatingOverlayPanel>
    </>
  );
}
