import { useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "@untitledui/icons";
import { cn } from "../../lib/utils";
import { useClickOutside } from "../../lib/useClickOutside";

export type SelectOption = {
  value: string;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Optional custom renderer for the chosen value inside the trigger. */
  renderValue?: (option: SelectOption | undefined) => ReactNode;
  align?: "left" | "right";
  size?: "md" | "lg";
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  className,
  renderValue,
  align = "left",
  size = "md",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3.5 text-left text-sm text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100",
          size === "lg" ? "h-11" : "h-10"
        )}
      >
        <span className="flex min-w-0 items-center gap-2 truncate">
          {renderValue
            ? renderValue(selected)
            : selected?.leading}
          <span className={cn("truncate", !selected && "text-gray-500")}>
            {renderValue ? null : selected?.label ?? placeholder}
          </span>
          {!renderValue && selected?.trailing ? selected.trailing : null}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className={cn(
            "absolute z-50 mt-1.5 max-h-64 w-full min-w-[12rem] overflow-auto rounded-lg border border-gray-200 bg-white p-1",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm hover:bg-gray-50",
                    active ? "text-gray-900" : "text-gray-700"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2 truncate">
                    {o.leading}
                    <span className="truncate">{o.label}</span>
                    {o.trailing}
                  </span>
                  {active ? (
                    <Check className="h-4 w-4 shrink-0 text-brand-600" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
