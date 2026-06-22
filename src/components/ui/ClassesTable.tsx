import type { Class } from "../../types/index";

interface ClassesTableProps {
  classes: Class[] | undefined;
  onEditClick: (classItem: Class) => void;
  onShowClick: (classItem: Class) => void;
}

const ClassesTable = ({ classes, onEditClick }: ClassesTableProps) => {
  if (!classes || classes.length === 0) {
    return <div>Nessuna classe trovata.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Details</th>
          <th>Teachers</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {classes?.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.level}</td>
            <td>{c.details}</td>
            <td>{c.teachers}</td>
            <td>
              <button onClick={() => onEditClick(c)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClassesTable;
