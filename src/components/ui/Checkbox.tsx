import { Check } from "@untitledui/icons";
import { cn } from "../../lib/utils";

export function Checkbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors focus:outline-none focus-visible:border-brand-500",
        checked
          ? "border-brand-600 bg-brand-50 text-brand-600"
          : "border-gray-300 bg-white text-transparent hover:border-brand-400"
      )}
    >
      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
    </button>
  );
}
