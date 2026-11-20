import { PageHeader } from "./PageHeader";
import { PerformanceOverview } from "./PerformanceOverview";
import { FeedbackPatterns } from "./FeedbackPatterns";
import { ProjectsAssigned } from "./ProjectsAssigned";
import { GoalSetting } from "./GoalSetting";
import { Achievements } from "./Achievements";
import type { SuggestionPattern } from "../../data/dashboard";

export function MyPerformancePage({
  onInitiateCoaching,
}: {
  onInitiateCoaching: (selected: SuggestionPattern[]) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <PageHeader />
      <PerformanceOverview />
      <FeedbackPatterns onInitiateCoaching={onInitiateCoaching} />
      <ProjectsAssigned />
      <GoalSetting />
      <Achievements />
    </div>
  );
}