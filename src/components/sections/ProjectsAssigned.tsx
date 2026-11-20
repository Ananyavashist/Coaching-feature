import { ArrowRight } from "@untitledui/icons";
import { Card, CardHeader } from "../ui/Card";
import { projects } from "../../data/dashboard";

export function ProjectsAssigned() {
  return (
    <Card>
      <CardHeader title="Project Assigned" />
      <ul className="space-y-2 p-5 pt-4">
        {projects.map((p) => (
          <li key={p}>
            <a
              href="#"
              className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-700">{p}</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600" />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
