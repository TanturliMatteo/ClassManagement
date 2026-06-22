import type { StudentWithClass } from "../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";
import { useGetClasses } from "../../hooks/useGetClasses";

interface FormEditStudentProps {
  studentData: StudentWithClass | null;
  onClose: () => void;
}

const FormEditStudent = ({ studentData, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState(studentData?.name || "");
  const [email, setEmail] = useState(studentData?.email || "");
  const [classId, setClassId] = useState(studentData?.class_id || "");
  const [enrollmentDate, setEnrollmentDate] = useState(
    studentData?.enrollment_date || "",
  );
  const [endDate, setEndDate] = useState(studentData?.end_date || "");
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  const { mutate, isPending } = useUpdateStudent();

  if (!studentData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name,
      class_id: classId,
      email: email,
      enrollment_date: enrollmentDate,
      end_date: endDate,
    };

    mutate(
      { id: studentData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Class:
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            disabled={isLoadingClasses}
            required
          >
            <option value="" disabled>
              -- Select a class --
            </option>
            {classes?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Enrollment Date:
          <input
            type="date"
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="button" onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Salvataggio..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default FormEditStudent;
