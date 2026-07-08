import type { ClassWithTeacher } from "../../types/index";
import toDateITA from "../../utils/toDateITA";

interface ClassesTableProps {
  classes: ClassWithTeacher[] | undefined;
  onEditClick: (classItem: ClassWithTeacher) => void;
  onTakeOverClick: () => void;
}

const ClassesTable = ({
  classes,
  onEditClick,
  onTakeOverClick,
}: ClassesTableProps) => {
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
          <th>Is Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {classes?.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.level}</td>
            <td>{c.details}</td>
            <td>{toDateITA(c.start_date)}</td>
            <td>{toDateITA(c.end_date)}</td>
            <td>{c.Teachers?.name}</td>
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
