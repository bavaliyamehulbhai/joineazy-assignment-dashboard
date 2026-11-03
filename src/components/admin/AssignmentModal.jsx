import Modal from "../common/Modal";
import Button from "../common/Button";

export default function AssignmentModal({ isOpen, onClose, onSave, assignment }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={assignment?.id ? "Edit Assignment" : "Create Assignment"}>
      <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
          <input className="w-full border border-slate-300 rounded-lg p-2 text-sm" defaultValue={assignment?.title || ""} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
          <textarea className="w-full border border-slate-300 rounded-lg p-2 text-sm" defaultValue={assignment?.description || ""} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}

