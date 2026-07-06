import { useRef, useState } from "react";
import { Calendar, ChevronDown, Check } from "@untitledui/icons";
import { useClickOutside } from "../../lib/useClickOutside";
import { cn } from "../../lib/utils";

const ranges = [
  "Jun 1, 2026, Jun 15, 2026",
  "May 16, 2026, May 31, 2026",
  "May 1, 2026, May 15, 2026",
  "Q2 2026 (Apr, May, Jun)",
];

function DateRangePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(ranges[0]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-left hover:bg-gray-50 sm:w-auto"
      >
        <span className="flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Performance history</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 z-50 mt-1.5 w-full min-w-[16rem] rounded-lg border border-gray-200 bg-white p-1"
        >
          {ranges.map((r) => (
            <li key={r}>
              <button
                role="option"
                aria-selected={r === value}
                onClick={() => {
                  setValue(r);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {r}
                {r === value ? <Check className="h-4 w-4 text-brand-600" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function PageHeader() {
  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker />
    </div>
  );
}
