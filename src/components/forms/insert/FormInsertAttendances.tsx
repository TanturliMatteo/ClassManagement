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
  // Stato locale per tracciare chi è presente/assente: { [studentId]: boolean }
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );

  const { data: students, isLoading } = useGetStudents();
  const { mutate: insertAttendance } = useInsertAttendance();

  // Filtriamo al volo solo gli studenti che appartengono a questa classe
  const filteredStudents = (students || []).filter(
    (student) => student.class_id === classId,
  );

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      onClose();
      return;
    }

    // Inviamo le presenze al database per ogni studente
    filteredStudents.forEach((student) => {
      // Se non è ancora presente nella mappa (l'utente non ha toccato il check), assume true (presente)
      const isPresent = attendanceMap[student.id] ?? true;

      insertAttendance({
        lesson_id: lessonId,
        student_id: student.id,
        is_present: isPresent,
      });
    });

    // ponytail: Eseguiamo N chiamate HTTP in parallelo. Funziona senza problemi per classi normali,
    // ma se noti rallentamenti l'upgrade path è riscrivere useInsertAttendance per fare un bulk insert (.insert([...])).
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
        <h3 style={{ marginBottom: "1rem" }}>Take Attendance</h3>

        {isLoading ? (
          <p>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ color: "gray", textAlign: "center", margin: "2rem 0" }}>
            No students found in this class.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Student Name</th>
                <th
                  style={{ padding: "8px", textWrap: "nowrap", width: "100px" }}
                >
                  Present
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isPresent = attendanceMap[student.id] ?? true;
                return (
                  <tr
                    key={student.id}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <td style={{ padding: "8px" }}>{student.name}</td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={(e) =>
                          setAttendanceMap((prev) => ({
                            ...prev,
                            [student.id]: e.target.checked,
                          }))
                        }
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
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
          {/* Essendo uno step vincolato alla creazione della lezione, 
              il "Cancel" qui chiude semplicemente il registro delle presenze */}
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
