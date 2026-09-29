import { useState } from "react";
import type { StudentWithForeign } from "../../types/index";
import toDateITA from "../../utils/toDateITA";
import checkEndDate from "../../utils/checkEndDate";
import { useGetAttendances } from "../../hooks/useGetAttendances";

interface StudentTableProps {
  students: StudentWithForeign[] | undefined;
  onEditClick: (student: StudentWithForeign) => void;
  onAttendanceClick: (student: StudentWithForeign) => void;
}

type SortField = "name" | "className" | "birth_date";

const StudentsTable = ({
  students,
  onEditClick,
  onAttendanceClick,
}: StudentTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc"); // Resetta a 'asc' se cambia la colonna selezionata
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  if (!students || students.length === 0)
    return <div>Nessuno studente trovato.</div>;

  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;

    if (sortField === "name") {
      const valA = (a.name ?? "").toLowerCase();
      const valB = (b.name ?? "").toLowerCase();
      comparison = valA.localeCompare(valB);
    } else if (sortField === "className") {
      const valA = (a.Classes?.name ?? "").toLowerCase();
      const valB = (b.Classes?.name ?? "").toLowerCase();
      comparison = valA.localeCompare(valB);
    } else if (sortField === "birth_date") {
      const timeA = a.birth_date ? new Date(a.birth_date).getTime() : 0;
      const timeB = b.birth_date ? new Date(b.birth_date).getTime() : 0;
      comparison = timeA - timeB;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <table>
      <thead>
        <tr>
          <th
            onClick={() => handleSort("name")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Name {renderSortIcon("name")}
          </th>
          <th>Email</th>
          <th
            onClick={() => handleSort("className")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Class Name {renderSortIcon("className")}
          </th>
          <th>Attendances</th>
          <th
            onClick={() => handleSort("birth_date")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Birth Date {renderSortIcon("birth_date")}
          </th>
          <th>Subscription start</th>
          <th>Subscription end</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.Classes?.name || "Nessuna classe"}</td>
            <td
              onClick={() => onAttendanceClick(s)}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {countAttendances(s.id) + "/" + totalStudentAttendances(s.id)}
            </td>
            <td>
              {s.birth_date
                ? new Date(s.birth_date).toLocaleDateString("it-IT")
                : "-"}
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
              {s.payment ? "Done" : "Missed"}
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
