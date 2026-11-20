import { HomeActionItems } from "./home/HomeActionItems";
import { HomePerformanceOverview } from "./home/HomePerformanceOverview";
import { HomeSuggestions } from "./home/HomeSuggestions";

export function HomePage({ onViewPattern }: { onViewPattern: () => void }) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <h1 className="text-2xl font-semibold text-gray-900">My Dashboard</h1>
      <HomePerformanceOverview />
      <HomeSuggestions onViewPattern={onViewPattern} />
      <HomeActionItems />
    </div>
  );
}