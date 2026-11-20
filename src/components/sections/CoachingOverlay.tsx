import { useEffect, useRef, useState } from "react";
import { XClose, Plus, Flag01, ClockRewind, ArrowUpRight } from "@untitledui/icons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Select, type SelectOption } from "../ui/Select";
import { FloatingOverlayBackdrop, FloatingOverlayPanel } from "../ui/FloatingOverlay";
import { useClickOutside } from "../../lib/useClickOutside";
import {
  coaches,
  timeSlots,
  priorities,
  coachingDefaults,
  sessionDates,
  feedbackPatterns,
  type SuggestionPattern,
  type CoachingSession,
} from "../../data/dashboard";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-gray-900">
      {children}
      {required ? <span className="text-error-500"> *</span> : null}
    </label>
  );
}

export function CoachingOverlay({
  open,
  onClose,
  initialSuggestions = [],
  patternsOnly = false,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialSuggestions?: SuggestionPattern[];
  patternsOnly?: boolean;
  onSubmit: (session: CoachingSession) => void;
}) {
  const [recipient, setRecipient] = useState(coaches[0].id);
  const [date, setDate] = useState(sessionDates[0]);
  const [slot, setSlot] = useState(timeSlots[0]);
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState(coachingDefaults.description);
  const [goals, setGoals] = useState<string[]>(coachingDefaults.meetingGoals.filter(Boolean));
  const [newGoal, setNewGoal] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionPattern[]>(initialSuggestions);
  const [addMoreOpen, setAddMoreOpen] = useState(false);
  const addMoreRef = useRef<HTMLDivElement>(null);
  useClickOutside(addMoreRef, () => setAddMoreOpen(false), addMoreOpen);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Re-seed form whenever the overlay is (re)opened.
  useEffect(() => {
    if (!open) return;
    setSuggestions(initialSuggestions);
    if (patternsOnly) {
      setDescription("");
      setGoals([]);
      setNewGoal("");
      setRecipient(coaches[0].id);
      setDate(sessionDates[0]);
      setSlot(timeSlots[0]);
      setPriority("medium");
    } else {
      setDescription(coachingDefaults.description);
      setGoals(coachingDefaults.meetingGoals.filter(Boolean));
    }
  }, [open, initialSuggestions, patternsOnly]);

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

  const addGoal = () => {
    const v = newGoal.trim();
    if (!v) return;
    setGoals((g) => [...g, v]);
    setNewGoal("");
  };

  const availableActions = feedbackPatterns.filter(
    (f) => !suggestions.some((s) => s.id === f.id)
  );

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

  const handleSubmit = () => {
    const coach = coaches.find((c) => c.id === recipient)!;
    onSubmit({
      id: `cs-${Date.now()}`,
      managerId: coach.id,
      managerName: coach.name,
      role: coach.designation,
      date,
      timeSlot: slot,
      priorityId: priority,
      description,
      category: suggestions[0]?.tag ?? "Engineering Excellence",
      suggestions,
      goals,
      status: "pending",
      submittedViaForm: true,
    });
  };

  return (
    <>
      <FloatingOverlayBackdrop open={open} onClose={onClose} />

      <FloatingOverlayPanel
        open={open}
        ariaLabel="Request a Coaching Session"
        width="md"
        data-tour={open ? "coaching-overlay" : undefined}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-semibold text-gray-900">Request a Coaching Session</h2>
            <Badge tone="brand">
              <ClockRewind className="mr-1 h-3 w-3" />
              Pending
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <XClose className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div>
            <Label required>Send this request to</Label>
            <Select
              options={recipientOptions}
              value={recipient}
              onChange={setRecipient}
              size="lg"
            />
          </div>

          <div>
            <Label required>Select the date</Label>
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
                  <div
                    key={s.id}
                    className="rounded-xl border border-gray-200 bg-white p-3.5"
                  >
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
            <Label>Provide a brief description of the issue</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <Label>Meeting Goals, what would you like to get out of this session?</Label>
            <div className="space-y-2.5">
              {goals.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={g}
                    onChange={(e) =>
                      setGoals((prev) => prev.map((x, idx) => (idx === i ? e.target.value : x)))
                    }
                    className="h-11 w-full rounded-lg border border-gray-300 px-3.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setGoals((prev) => prev.filter((_, idx) => idx !== i))}
                    className="shrink-0 rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                    aria-label="Remove goal"
                  >
                    <XClose className="h-5 w-5" />
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
                  placeholder="Add what do you want to get out of this session"
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

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            Will show as pending until manager responds
          </p>
          <Button className="w-full sm:w-auto" onClick={handleSubmit}>
            Send Request
            <ArrowUpRight className="h-4.5 w-4.5" />
          </Button>
        </div>
      </FloatingOverlayPanel>
    </>
  );
}
