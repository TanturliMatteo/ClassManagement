import type { LessonWithClass } from "../../types/index";
import toDateITA from "../../utils/toDateITA";

interface LessonsTableProps {
  lessons: LessonWithClass[] | undefined;
  onEditClick: (lesson: LessonWithClass) => void;
}

const LessonsTable = ({ lessons, onEditClick }: LessonsTableProps) => {
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
            <td>{l.title}</td>
            <td className="description-input">
              {/* {l.description} */}
              //Inserire un Input per visualizzare la descrizione al completo,
              altrimenti è troppo lunga e non si vede tutta
            </td>
            <td>{l.date}</td>
            <td>{toDateITA(l.date)}</td>
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
