import { useState } from "react";
import { useGetStudents } from "../../../hooks/useGetStudents";
import { useUpdateAttendance } from "../../../hooks/useUpdateAttendance";

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
  const {
    mutate: saveAttendances,
    isPending: isSaving,
    error: saveError,
  } = useUpdateAttendance();

  const filteredStudents = (students || []).filter(
    (student) => student.class_id === classId,
  );

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      onClose();
      return;
    }

    // Una sola richiesta per tutto l'appello: o si salva tutto o niente.
    const attendancesPayload = filteredStudents.map((student) => ({
      lesson_id: lessonId,
      student_id: student.id,
      is_present: attendanceMap[student.id] ?? true,
    }));

    // Il modale si chiude solo se il salvataggio è andato a buon fine.
    saveAttendances(attendancesPayload, { onSuccess: onClose });
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
                        style={{ width: "20px", height: "20px" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {saveError && (
          <p style={{ color: "#ff4d4d", fontWeight: "bold", textAlign: "center" }}>
            Salvataggio non riuscito: {saveError.message}
          </p>
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
            disabled={isLoading || isSaving || filteredStudents.length === 0}
          >
            {isSaving ? "Saving..." : "Save Attendances"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInsertAttendances;
