import type { LessonWithClass } from "../../types/index";
import toDateITA from "../../utils/toDateITA";
import truncateWords from "../../utils/truncateWords";

interface LessonsTableProps {
  lessons: LessonWithClass[] | undefined;
  onEditClick: (lesson: LessonWithClass) => void;
  onDescriptionClick: (description: string) => void;
}

const LessonsTable = ({
  lessons,
  onEditClick,
  onDescriptionClick,
}: LessonsTableProps) => {
  if (!lessons || lessons.length === 0)
    return <div>Nessuna lezione trovata.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Class</th>
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
                {truncateWords(l.description ?? "", 6)}
              </button>
            </td>
            <td>{toDateITA(l.date)}</td>
            <td>{l.Classes?.name}</td>
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
