import { Card, CardHeader } from "../ui/Card";
import { Icon } from "../Icon";
import { achievements } from "../../data/dashboard";

export function Achievements() {
  return (
    <Card>
      <CardHeader title="Achievements" />
      <div className="grid grid-cols-1 gap-4 p-5 pt-4 sm:grid-cols-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 text-center"
          >
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-warning-200" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-warning-500 border-r-warning-500" />
              <div className="flex flex-col items-center">
                <Icon name={a.icon} className="h-5 w-5 text-warning-600" />
                <span className="mt-0.5 text-xl font-bold text-gray-900">{a.value}</span>
              </div>
            </div>
            <p className="mt-3 max-w-[12rem] text-sm text-gray-600">{a.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
