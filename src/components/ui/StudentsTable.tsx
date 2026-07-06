import type { StudentWithClass } from "../../types/index";
import toDateITA from "../../utils/toDateITA";
import checkEndDate from "../../utils/checkEndDate";

interface StudentTableProps {
  students: StudentWithClass[] | undefined;
  onEditClick: (student: StudentWithClass) => void;
}

const StudentsTable = ({ students, onEditClick }: StudentTableProps) => {
  if (!students || students.length === 0)
    return <div>Nessuno studente trovato.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Class Name</th>
          <th>Subscription start</th>
          <th>Subscription end</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.Classes?.name || "Nessuna classe"}</td>
            <td>{toDateITA(s.enrollment_date)}</td>
            <td
              style={
                checkEndDate(s.end_date)
                  ? {
                      color: "red",
                      fontWeight: "bold",
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                      textDecorationThickness: "2px",
                    }
                  : {}
              }
            >
              {toDateITA(s.end_date)}
            </td>
            <td
              style={{ color: s.payment ? "green" : "red", fontWeight: "bold" }}
            >
              {s.payment ? "Paid" : "Not Paid"}
            </td>
            <td>
              <button onClick={() => onEditClick(s)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
