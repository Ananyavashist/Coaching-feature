import { ChevronRight } from "@untitledui/icons";
import { Badge } from "../ui/Badge";
import { type CoachingSession } from "../../data/dashboard";
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
  const categoryTags = Array.from(new Set(session.suggestions.map((s) => s.tag))).slice(0, 2);

  const dateLine = session.dateMeta ?? session.date;
  const timeLine = session.timeMeta ?? formatTimeSlot(session.timeSlot);

  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar">
          <StatusDotBadge label="Ended" tone="gray" />
          {mode === "board" && session.boardApprovalStatus === "draft" ? (
            <Badge tone="warning" className="shrink-0 whitespace-nowrap">
              Sending request pending
            </Badge>
          ) : null}
          {mode === "board" && session.boardApprovalStatus === "pending" ? (
            <Badge tone="brand" className="shrink-0 whitespace-nowrap">
              Pending manager approval
            </Badge>
          ) : null}
          {categoryTags.map((tag) => (
            <FocusTag key={tag} tag={tag} className="shrink-0" />
          ))}
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

      <SessionMetaRow dateLine={dateLine} timeLine={timeLine} className="mt-4" />

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