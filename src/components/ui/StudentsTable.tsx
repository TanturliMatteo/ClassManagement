import type { StudentWithForeign } from "../../types/index";
import toDateITA from "../../utils/toDateITA";
import checkEndDate from "../../utils/checkEndDate";
import { useGetAttendances } from "../../hooks/useGetAttendances";

interface StudentTableProps {
  students: StudentWithForeign[] | undefined;
  onEditClick: (student: StudentWithForeign) => void;
}

const StudentsTable = ({ students, onEditClick }: StudentTableProps) => {
  const { data: attendances } = useGetAttendances();
  const countAttendances = (studentId: string) => {
    if (!attendances) return 0;
    return attendances.filter((a) => a.student_id === studentId && a.is_present)
      .length;
  };
  const totalStudentAttendances = (studentId: string) => {
    if (!attendances) return 0;
    return attendances.filter((a) => a.student_id === studentId).length;
  };

  if (!students || students.length === 0)
    return <div>Nessuno studente trovato.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Class Name</th>
          <th>Attendances</th>
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
            <td>
              {countAttendances(s.id) + "/" + totalStudentAttendances(s.id)}
            </td>
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
