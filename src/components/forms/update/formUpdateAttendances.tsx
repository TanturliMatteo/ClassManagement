import { useState } from "react";
import { useGetStudents } from "../../../hooks/useGetStudents";
import { useGetLessonAttendances } from "../../../hooks/useGetLessonAttendances";
import { useUpdateAttendance } from "../../../hooks/useUpdateAttendance";
import type { Attendances } from "../../../types/index";
import isStudentActiveOn from "../../../utils/isStudentActiveOn";

interface FormUpdateAttendancesProps {
  classId: string;
  lessonId: string;
  lessonDate: string;
  onClose: () => void;
  readOnly: boolean;
}

const FormUpdateAttendances = ({
  classId,
  lessonId,
  lessonDate,
  onClose,
  readOnly,
}: FormUpdateAttendancesProps) => {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );

  const { data: students, isLoading: isLoadingStudents } = useGetStudents();
  const { data: existingAttendances, isLoading: isLoadingAttendances } =
    useGetLessonAttendances(lessonId);
  const {
    mutate: updateAttendance,
    isPending: isSaving,
    error: saveError,
  } = useUpdateAttendance();

  const isLoading = isLoadingStudents || isLoadingAttendances;

  const isAttendanceAlreadyTaken = (existingAttendances || []).length > 0;

  // Appello già fatto: la lista è quella salvata quel giorno (storico reale),
  // indipendente dalla classe in cui lo studente si trova oggi.
  // Prima compilazione: studenti della classe iscritti alla data della lezione.
  const studentsById = new Map((students || []).map((s) => [s.id, s]));
  const filteredStudents = (
    isAttendanceAlreadyTaken
      ? (existingAttendances || []).map((att) => ({
          id: att.student_id,
          name:
            studentsById.get(att.student_id)?.name ?? "Studente non trovato",
        }))
      : (students || [])
          .filter(
            (student) =>
              student.class_id === classId &&
              isStudentActiveOn(student, lessonDate),
          )
          .map((student) => ({ id: student.id, name: student.name }))
  ).sort((a, b) => a.name.localeCompare(b.name));

  const dbAttendanceMap = (existingAttendances || []).reduce<
    Record<string, boolean>
  >((acc, att: Attendances) => {
    if (att.student_id && att.is_present !== null) {
      acc[att.student_id] = att.is_present;
    }
    return acc;
  }, {});

  const defaultFallback = isAttendanceAlreadyTaken ? false : true;

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      onClose();
      return;
    }

    const attendancesPayload = filteredStudents.map((student) => {
      const isPresent =
        attendanceMap[student.id] ??
        dbAttendanceMap[student.id] ??
        defaultFallback;

      return {
        lesson_id: lessonId,
        student_id: student.id,
        is_present: isPresent,
      };
    });

    // Il modale si chiude solo se il salvataggio è andato a buon fine.
    updateAttendance(attendancesPayload, { onSuccess: onClose });
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
          <p>Loading register data...</p>
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
                const isPresent =
                  attendanceMap[student.id] ??
                  dbAttendanceMap[student.id] ??
                  defaultFallback;

                return (
                  <tr
                    key={student.id}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <td style={{ padding: "8px" }}>{student.name}</td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="checkbox"
                        disabled={readOnly}
                        checked={isPresent}
                        onChange={(e) =>
                          setAttendanceMap((prev) => ({
                            ...prev,
                            [student.id]: e.target.checked,
                          }))
                        }
                        style={{
                          width: "20px",
                          height: "20px",
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
            marginTop: "1.5rem",
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, margin: 0 }}
            className="cancel-btn"
          >
            Cancel
          </button>

          {!readOnly && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || isSaving || filteredStudents.length === 0}
              style={{ flex: 1, margin: 0 }}
            >
              {isSaving ? "Saving..." : "Update Attendances"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUpdateAttendances;
