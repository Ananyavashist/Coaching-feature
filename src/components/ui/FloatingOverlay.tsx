import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

const FLOAT_SHADOW = "shadow-[0_12px_40px_rgba(16,24,40,0.14),0_0_0_1px_rgba(16,24,40,0.04)]";

export function FloatingOverlayBackdrop({
  open,
  onClose,
  zIndex = 40,
}: {
  open: boolean;
  onClose?: () => void;
  zIndex?: number;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-gray-900/40 transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      style={{ zIndex }}
      onClick={onClose}
      aria-hidden={!open}
    />
  );
}

export function FloatingOverlayPanel({
  open,
  side = "right",
  children,
  className,
  ariaLabel,
  width = "md",
  zIndex = 50,
  ...rest
}: {
  open: boolean;
  side?: "right" | "center";
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  width?: "sm" | "md" | "lg";
  zIndex?: number;
} & HTMLAttributes<HTMLDivElement>) {
  const widthClass =
    width === "sm"
      ? "sm:max-w-[440px] lg:max-w-[min(480px,calc((100vw-16rem)/2-2rem))]"
      : width === "lg"
        ? "sm:max-w-[560px] lg:max-w-[min(640px,calc((100vw-16rem)/2-2rem))]"
        : "sm:max-w-[480px] lg:max-w-[min(520px,calc((100vw-16rem)/2-2rem))]";

  if (side === "center") {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(
          "fixed left-1/2 top-1/2 flex max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] min-h-0 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-300",
          FLOAT_SHADOW,
          open ? "scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0",
          className
        )}
        style={{ zIndex }}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={cn(
        "fixed bottom-3 right-3 top-3 flex w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-transform duration-300 ease-out sm:bottom-4 sm:right-4 sm:top-4",
        FLOAT_SHADOW,
        widthClass,
        open ? "translate-x-0" : "translate-x-[calc(100%+1.25rem)]",
        className
      )}
      style={{ zIndex }}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </aside>
  );
}

export function FloatingConfirmPanel({
  open,
  children,
  ariaLabel,
  className,
  zIndex = 70,
  showBackdrop = true,
}: {
  open: boolean;
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  zIndex?: number;
  /** When false, only the centered panel is shown (use with FloatingOverlayBackdrop). */
  showBackdrop?: boolean;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex }}
    >
      {showBackdrop ? (
        <div className="absolute inset-0 bg-gray-900/40" aria-hidden />
      ) : null}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(
          "relative z-[1] w-full max-w-md rounded-[20px] border border-gray-200 bg-white p-6",
          FLOAT_SHADOW,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
