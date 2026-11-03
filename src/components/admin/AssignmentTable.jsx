import Button from "../common/Button";

export default function AssignmentTable({ assignments, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
          <tr>
            <th className="px-6 py-3">Assignment</th>
            <th className="px-6 py-3">Due Date</th>
            <th className="px-6 py-3">Students</th>
            <th className="px-6 py-3">Submitted</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {assignments?.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
              <td className="px-6 py-4">{item.dueDate}</td>
              <td className="px-6 py-4">{item.assignedTo?.length || 0}</td>
              <td className="px-6 py-4">{Object.values(item.submissions || {}).filter(s => s === "submitted").length}</td>
              <td className="px-6 py-4 flex gap-2">
                <Button variant="secondary" onClick={() => onView(item)}>View</Button>
                <Button variant="outline" onClick={() => onEdit(item)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(item)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

