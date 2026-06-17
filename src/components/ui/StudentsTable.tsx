import type { StudentWithClass } from "../../types/index";

interface StudentTableProps {
  students: StudentWithClass[] | undefined;
  onEditClick: (student: StudentWithClass) => void;
}

const StudentsTable = ({ students, onEditClick }: StudentTableProps) => {
  if (!students || students.length === 0)
    return <div>Nessuno studente trovato.</div>;

  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Class Name</th>
          <th>Subscription start</th>
          <th>Subscription end</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.Classes?.name || "Nessuna classe"}</td>
            <td>
              {s.enrollment_date
                ? new Date(s.enrollment_date).toLocaleDateString("it-IT")
                : "Non definita"}
            </td>
            <td>
              {s.end_date
                ? new Date(s.end_date).toLocaleDateString("it-IT")
                : "Non definita"}
            </td>
            <td>
              <button onClick={() => onEditClick(s)} className="btn-action">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
