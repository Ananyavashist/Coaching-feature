import { createPortal } from "react-dom";
import { Button } from "../ui/Button";
import { FloatingConfirmPanel } from "../ui/FloatingOverlay";

export function TourWelcomePrompt({
  open,
  onStart,
  onLater,
}: {
  open: boolean;
  onStart: () => void;
  onLater: () => void;
}) {
  if (!open) return null;

  return createPortal(
    <FloatingConfirmPanel open ariaLabel="Welcome tour" zIndex={90}>
      <h2 className="text-lg font-semibold text-gray-900">Take a quick tour?</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Walk through Bonnie Green&apos;s coaching journey on this prototype, from feedback on
        Overview to live meetings and saved sessions.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">
        Not now? Choose <span className="font-medium text-gray-700">Maybe later</span>. You can
        start the tour again anytime from your profile at the bottom of the sidebar.
      </p>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" size="md" onClick={onLater}>
          Maybe later
        </Button>
        <Button size="md" onClick={onStart}>
          Start tour
        </Button>
      </div>
    </FloatingConfirmPanel>,
    document.body
  );
}
