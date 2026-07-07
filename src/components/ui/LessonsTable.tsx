import type { LessonWithForeign } from "../../types/index";
import truncateWords from "../../utils/truncateWords";
import toDateTimeITA from "../../utils/toDateTime.ITA";

interface LessonsTableProps {
  lessons: LessonWithForeign[] | undefined;
  onEditClick: (lesson: LessonWithForeign) => void;
  onDescriptionClick: (description: string) => void;
  onAttendanceClick: (lesson: LessonWithForeign) => void;
}

const LessonsTable = ({
  lessons,
  onEditClick,
  onDescriptionClick,
  onAttendanceClick,
}: LessonsTableProps) => {
  if (!lessons || lessons.length === 0)
    return <div>Nessuna lezione trouvata.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Class</th>
          <th>Teacher</th>
          <th>Attendance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {lessons?.map((l) => (
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
              {" "}
              <button onClick={() => onEditClick(l)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LessonsTable;
