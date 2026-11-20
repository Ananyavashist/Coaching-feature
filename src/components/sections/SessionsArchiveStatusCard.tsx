import { ChevronRight, Flag01 } from "@untitledui/icons";
import { Badge } from "../ui/Badge";
import { priorities, type CoachingSession } from "../../data/dashboard";
import {
  CardDivider,
  FocusTag,
  formatTimeSlot,
  IdentityBlock,
  SessionMetaRow,
  StatusDotBadge,
} from "./session/SessionCardShared";

export function SessionsArchiveStatusCard({
  session,
  mode,
  onOpen,
}: {
  session: CoachingSession;
  mode: "board" | "transcript";
  onOpen: () => void;
}) {
  const priority = priorities.find((p) => p.id === session.priorityId);
  const categoryTags = Array.from(new Set(session.suggestions.map((s) => s.tag))).slice(0, 2);

  const dateLine = session.dateMeta ?? session.date;
  const timeLine = session.timeMeta ?? formatTimeSlot(session.timeSlot);

  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusDotBadge label="Ended" tone="gray" />
          {priority ? (
            <Badge tone={priority.tone} className="font-medium">
              <Flag01 className="mr-1 h-3 w-3" />
              {priority.label}
            </Badge>
          ) : null}
          {mode === "board" && session.boardApprovalStatus === "draft" ? (
            <Badge tone="warning">Sending request pending</Badge>
          ) : null}
          {mode === "board" && session.boardApprovalStatus === "pending" ? (
            <Badge tone="brand">Pending manager approval</Badge>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Session notes
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <IdentityBlock name={session.managerName} role={session.role} />

      {categoryTags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryTags.map((tag) => (
            <FocusTag key={tag} tag={tag} />
          ))}
        </div>
      ) : null}

      <SessionMetaRow
        dateLine={dateLine}
        timeLine={timeLine}
        className={categoryTags.length > 0 ? "mt-3" : "mt-4"}
      />

      <CardDivider />

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-900">Description</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-4">
          {session.description}
        </p>
      </div>
    </article>
  );
}