import { useState } from "react";
import { useGetStudents } from "../../../hooks/useGetStudents";
import { useInsertAttendance } from "../../../hooks/useInsertAttendance";

interface FormInsertAttendancesProps {
  classId: string;
  lessonId: string;
  onClose: () => void;
}

const FormInsertAttendances = ({
  classId,
  lessonId,
  onClose,
}: FormInsertAttendancesProps) => {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );

  const { data: students, isLoading } = useGetStudents();
  const { mutate: insertAttendance } = useInsertAttendance();

  const filteredStudents = (students || []).filter(
    (student) => student.class_id === classId,
  );

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      onClose();
      return;
    }

    filteredStudents.forEach((student) => {
      const isPresent = attendanceMap[student.id] ?? true;

      insertAttendance({
        lesson_id: lessonId,
        student_id: student.id,
        is_present: isPresent,
      });
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-box"
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          width: "50%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <p>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ color: "gray", textAlign: "center", margin: "2rem 0" }}>
            No students found in this class.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isPresent = attendanceMap[student.id] ?? true;
                return (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={(e) =>
                          setAttendanceMap((prev) => ({
                            ...prev,
                            [student.id]: e.target.checked,
                          }))
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "auto",
          }}
        >
          <button type="button" onClick={onClose}>
            Skip / Close
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || filteredStudents.length === 0}
          >
            Save Attendances
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInsertAttendances;
