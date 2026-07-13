import { Button } from "../../ui/Button";

export function LeaveWithoutApprovalModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/50"
        onClick={onCancel}
        aria-hidden
      />
      <div
        role="dialog"
        aria-labelledby="leave-modal-title"
        aria-describedby="leave-modal-desc"
        className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-6"
      >
        <h2 id="leave-modal-title" className="text-lg font-semibold text-gray-900">
          Approval request not sent
        </h2>
        <p id="leave-modal-desc" className="mt-3 text-sm leading-relaxed text-gray-600">
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
      </div>
    </div>
  );
}
