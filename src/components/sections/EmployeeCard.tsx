import { Card } from "../ui/Card";
import { employee } from "../../data/dashboard";

export function EmployeeCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">{employee.name}</h2>
          <p className="text-sm text-gray-500">{employee.role}</p>
        </div>
      </div>
    </Card>
  );
}
