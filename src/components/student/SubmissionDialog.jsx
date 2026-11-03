import Modal from "../common/Modal";
import Button from "../common/Button";

export default function SubmissionDialog({ isOpen, onClose, onConfirm, step = 1, onNextStep, assignmentTitle }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? "Submit Assignment" : "Confirm Submission"}
    >
      {step === 1 ? (
        <div>
          <p className="text-slate-600 mb-6">
            Have you completed and submitted the work for <strong>{assignmentTitle}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onNextStep}>Yes, I have submitted</Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-slate-600 mb-6">
            Are you sure you want to mark this assignment as submitted? This will update your progress.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Go Back</Button>
            <Button variant="primary" onClick={onConfirm}>Confirm Submission</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

