import Badge from "../common/Badge";

export default function StudentStatusList({ students = [], submissions = {} }) {
  return (
    <div className="space-y-3">
      {students.map((student) => {
        const status = submissions[student.id] || "pending";
        return (
          <div key={student.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 text-sm">{student.name}</p>
              <p className="text-xs text-slate-500">{student.email}</p>
            </div>
            <Badge status={status} />
          </div>
        );
      })}
    </div>
  );
}

