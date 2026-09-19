import { useState } from "react";
import type { ClassWithTeacher } from "../../types/index";
import toDateITA from "../../utils/toDateITA";

interface ClassesTableProps {
  classes: ClassWithTeacher[] | undefined;
  onEditClick: (classItem: ClassWithTeacher) => void;
  onTakeOverClick: () => void;
}

type SortField =
  | "name"
  | "level"
  | "start_date"
  | "end_date"
  | "teacher"
  | "is_active"
  | "num_student";

const ClassesTable = ({
  classes,
  onEditClick,
  onTakeOverClick,
}: ClassesTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (!classes || classes.length === 0) {
    return <div>Nessuna classe trovata.</div>;
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  const sortedClasses = [...classes].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;

    if (sortField === "name") {
      comparison = (a.name ?? "")
        .toLowerCase()
        .localeCompare((b.name ?? "").toLowerCase());
    } else if (sortField === "level") {
      comparison = (a.level ?? "")
        .toLowerCase()
        .localeCompare((b.level ?? "").toLowerCase());
    } else if (sortField === "start_date") {
      const timeA = a.start_date ? new Date(a.start_date).getTime() : 0;
      const timeB = b.start_date ? new Date(b.start_date).getTime() : 0;
      comparison = timeA - timeB;
    } else if (sortField === "end_date") {
      const timeA = a.end_date ? new Date(a.end_date).getTime() : 0;
      const timeB = b.end_date ? new Date(b.end_date).getTime() : 0;
      comparison = timeA - timeB;
    } else if (sortField === "teacher") {
      comparison = (a.Teachers?.name ?? "")
        .toLowerCase()
        .localeCompare((b.Teachers?.name ?? "").toLowerCase());
    } else if (sortField === "is_active") {
      comparison = Number(a.is_active) - Number(b.is_active);
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const headerStyle = {
    cursor: "pointer",
    userSelect: "none" as const,
    whiteSpace: "nowrap" as const,
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} style={headerStyle}>
            Name {renderSortIcon("name")}
          </th>
          <th onClick={() => handleSort("level")} style={headerStyle}>
            Level {renderSortIcon("level")}
          </th>
          <th>Book</th>
          <th onClick={() => handleSort("start_date")} style={headerStyle}>
            Start Date {renderSortIcon("start_date")}
          </th>
          <th onClick={() => handleSort("end_date")} style={headerStyle}>
            End Date {renderSortIcon("end_date")}
          </th>
          <th onClick={() => handleSort("teacher")} style={headerStyle}>
            Teacher {renderSortIcon("teacher")}
          </th>
          <th onClick={() => handleSort("num_student")} style={headerStyle}>
            Students Numbers {renderSortIcon("num_student")}
          </th>
          <th onClick={() => handleSort("is_active")} style={headerStyle}>
            Is Active {renderSortIcon("is_active")}
          </th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedClasses.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.level}</td>
            <td>{c.details}</td>
            <td>{toDateITA(c.start_date)}</td>
            <td>{toDateITA(c.end_date)}</td>
            <td>{c.Teachers?.name}</td>
            <td>{c.num_student}</td>
            <td>{c.is_active ? "Yes" : "No"}</td>

            <td>
              {" "}
              <button onClick={() => onEditClick(c)}>Edit</button>
              {c.is_active && (
                <button
                  onClick={() => {
                    onTakeOverClick();
                    onEditClick(c);
                  }}
                  style={{
                    backgroundColor: "lightgray",
                    color: "black",
                    marginRight: "5px",
                  }}
                >
                  Take Over
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClassesTable;
