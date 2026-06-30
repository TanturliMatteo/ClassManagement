import type { Teacher } from "../../types/index";

interface TeacherTableProps {
  teachers: Teacher[] | undefined;
  onEditClick: (teacher: Teacher) => void;
}

const TeachersTable = ({ teachers, onEditClick }: TeacherTableProps) => {
  if (!teachers || teachers.length === 0)
    return <div>Nessun insegnante trovato.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Admin Privileges</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers?.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>
            <td>{t.email}</td>
            <td>{t.admin_access ? "Sì" : "No"}</td>
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
