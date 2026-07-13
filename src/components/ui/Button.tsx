import React from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "secondary-color" | "tertiary" | "ghost-icon";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border font-semibold transition-colors focus:outline-none focus-visible:border-brand-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-cta text-white border-cta hover:bg-cta-hover hover:border-cta-hover",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  "secondary-color":
    "bg-white text-[#000000] border border-[#000000] hover:bg-gray-50",
  tertiary: "bg-transparent text-gray-600 hover:bg-gray-50 border border-transparent",
  "ghost-icon":
    "bg-transparent text-gray-500 hover:bg-gray-100 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3.5 text-sm",
  lg: "h-11 px-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
