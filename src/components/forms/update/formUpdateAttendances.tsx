import { useState } from "react";
import { useGetStudents } from "../../../hooks/useGetStudents";
import { useGetLessonAttendances } from "../../../hooks/useGetLessonAttendances";
import { useUpdateAttendance } from "../../../hooks/useUpdateAttendance";
import type { Attendances } from "../../../types/index";

interface FormUpdateAttendancesProps {
  classId: string;
  lessonId: string;
  onClose: () => void;
  readOnly: boolean;
}

const FormUpdateAttendances = ({
  classId,
  lessonId,
  onClose,
  readOnly,
}: FormUpdateAttendancesProps) => {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>(
    {},
  );

  const { data: students, isLoading: isLoadingStudents } = useGetStudents();
  const { data: existingAttendances, isLoading: isLoadingAttendances } =
    useGetLessonAttendances(lessonId);
  const { mutate: updateAttendance } = useUpdateAttendance();

  const isLoading = isLoadingStudents || isLoadingAttendances;

  const filteredStudents = (students || []).filter(
    (student) => student.class_id === classId,
  );

  const dbAttendanceMap = (existingAttendances || []).reduce<
    Record<string, boolean>
  >((acc, att: Attendances) => {
    if (att.student_id && att.is_present !== null) {
      acc[att.student_id] = att.is_present;
    }
    return acc;
  }, {});

  const handleSubmit = () => {
    if (filteredStudents.length === 0) {
      onClose();
      return;
    }

    const attendancesPayload = filteredStudents.map((student) => {
      const isPresent =
        attendanceMap[student.id] ?? dbAttendanceMap[student.id] ?? true;

      return {
        lesson_id: lessonId,
        student_id: student.id,
        is_present: isPresent,
      };
    });

    updateAttendance(attendancesPayload);

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
        <h3 style={{ marginBottom: "1rem" }}>Edit Attendance</h3>

        {isLoading ? (
          <p>Loading register data...</p>
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
                const isPresent =
                  attendanceMap[student.id] ??
                  dbAttendanceMap[student.id] ??
                  true;

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
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          {!readOnly && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || filteredStudents.length === 0}
            >
              Update Attendances
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUpdateAttendances;
