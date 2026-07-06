import type { ClassWithTeacher } from "../../types/index";

interface ClassesTableProps {
  classes: ClassWithTeacher[] | undefined;
  onEditClick: (classItem: ClassWithTeacher) => void;
  onShowClick: (classItem: ClassWithTeacher) => void;
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
          <th>Start Date</th>
          <th>End Date</th>
          <th>Teacher</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {classes?.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.level}</td>
            <td>{c.details}</td>
            <td>{c.start_date}</td>
            <td>{c.end_date}</td>
            <td>{c.Teachers?.name}</td>
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
