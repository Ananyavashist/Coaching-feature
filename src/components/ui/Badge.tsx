import React from "react";
import { cn } from "../../lib/utils";

type Tone = "brand" | "warning" | "gray" | "success" | "error";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-700",
  warning: "bg-warning-50 text-warning-700 border-warning-700",
  gray: "bg-gray-50 text-gray-700 border-gray-700",
  success: "bg-success-50 text-success-700 border-success-700",
  error: "bg-error-50 text-error-700 border-error-700",
};

export function Badge({
  tone = "gray",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] border p-1.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
