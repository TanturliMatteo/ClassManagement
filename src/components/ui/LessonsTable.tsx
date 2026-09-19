import { useState } from "react";
import type { LessonWithForeign } from "../../types/index";
import truncateWords from "../../utils/truncateWords";
import toDateTimeITA from "../../utils/toDateTime.ITA";

interface LessonsTableProps {
  lessons: LessonWithForeign[] | undefined;
  onEditClick: (lesson: LessonWithForeign) => void;
  onDescriptionClick: (description: string) => void;
  onAttendanceClick: (lesson: LessonWithForeign) => void;
}

type SortField = "title" | "date" | "className" | "teacher";

const LessonsTable = ({
  lessons,
  onEditClick,
  onDescriptionClick,
  onAttendanceClick,
}: LessonsTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (!lessons || lessons.length === 0)
    return <div>Nessuna lezione trovata.</div>;

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

  const sortedLessons = [...lessons].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;

    if (sortField === "title") {
      comparison = (a.title ?? "")
        .toLowerCase()
        .localeCompare((b.title ?? "").toLowerCase());
    } else if (sortField === "date") {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      comparison = timeA - timeB;
    } else if (sortField === "className") {
      comparison = (a.Classes?.name ?? "")
        .toLowerCase()
        .localeCompare((b.Classes?.name ?? "").toLowerCase());
    } else if (sortField === "teacher") {
      comparison = (a.Teachers?.name ?? "")
        .toLowerCase()
        .localeCompare((b.Teachers?.name ?? "").toLowerCase());
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
          <th onClick={() => handleSort("title")} style={headerStyle}>
            Title {renderSortIcon("title")}
          </th>
          <th>Description</th>
          <th onClick={() => handleSort("date")} style={headerStyle}>
            Date {renderSortIcon("date")}
          </th>
          <th onClick={() => handleSort("className")} style={headerStyle}>
            Class {renderSortIcon("className")}
          </th>
          <th onClick={() => handleSort("teacher")} style={headerStyle}>
            Teacher {renderSortIcon("teacher")}
          </th>
          <th>Attendance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedLessons.map((l) => (
          <tr key={l.id}>
            <td className="table-td-max-width">{l.title}</td>
            <td>
              <button
                onClick={() => onDescriptionClick(l.description ?? "")}
                style={{ color: "black", background: "none" }}
                className="table-td-max-width"
              >
                {truncateWords(l.description ?? "", 3)}
              </button>
            </td>
            <td>{toDateTimeITA(l.date)}</td>
            <td>{l.Classes?.name}</td>
            <td>{l.Teachers?.name}</td>
            <td>
              <button
                onClick={() => onAttendanceClick(l)}
                style={{ background: "lightgray", color: "black" }}
              >
                Show More
              </button>
            </td>
            <td>
              <button onClick={() => onEditClick(l)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LessonsTable;
