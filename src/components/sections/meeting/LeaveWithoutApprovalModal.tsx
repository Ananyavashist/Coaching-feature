import { Button } from "../../ui/Button";
import { FloatingOverlayBackdrop, FloatingConfirmPanel } from "../../ui/FloatingOverlay";

export function LeaveWithoutApprovalModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <FloatingOverlayBackdrop open={open} onClose={onCancel} zIndex={70} />
      <FloatingConfirmPanel
        open={open}
        ariaLabel="Approval request not sent"
        zIndex={71}
        showBackdrop={false}
      >
        <h2 className="text-lg font-semibold text-gray-900">Approval request not sent</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          You haven&apos;t sent this session board to your manager for approval yet. If you
          leave now, your session board and transcript will be saved as a{" "}
          <strong className="font-medium text-gray-900">draft</strong> under{" "}
          <strong className="font-medium text-gray-900">Sessions</strong>. You can return
          anytime to add the remaining details and send the approval request.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Leave session
          </Button>
        </div>
      </FloatingConfirmPanel>
    </>
  );
}
