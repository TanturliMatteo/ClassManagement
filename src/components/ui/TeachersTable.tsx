import type { Teacher } from "../../types/index";
import { useGetLessons } from "../../hooks/useGetLessons";

interface TeacherTableProps {
  teachers: Teacher[] | undefined;
  onEditClick: (teacher: Teacher) => void;
}

const TeachersTable = ({ teachers, onEditClick }: TeacherTableProps) => {
  const { data: lessons } = useGetLessons();
  const getLessonCount = (teacherId: string) => {
    if (!lessons) return 0;
    return lessons.filter((lesson) => lesson.teacher_id === teacherId).length;
  };

  if (!teachers || teachers.length === 0)
    return <div>Nessun insegnante trovato.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Lessons</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers?.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.email}</td>
            <td>{getLessonCount(t.id)}</td>

            <td>
              <button onClick={() => onEditClick(t)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeachersTable;
