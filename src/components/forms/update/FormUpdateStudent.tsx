import type { StudentWithClass } from "../../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../../hooks/useUpdateStudent";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormEditStudentProps {
  studentData: StudentWithClass | null;
  onClose: () => void;
}

const FormEditStudent = ({ studentData, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState(studentData?.name || "");
  const [email, setEmail] = useState(studentData?.email || "");
  const [class_id, setClass_id] = useState(studentData?.class_id || "");
  const [enrollment_date, setEnrollment_date] = useState(
    studentData?.enrollment_date || "",
  );
  const [end_date, setEnd_date] = useState(studentData?.end_date || "");
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  const { mutate, isPending } = useUpdateStudent();

  if (!studentData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name,
      class_id,
      email,
      enrollment_date,
      end_date,
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
            value={class_id}
            onChange={(e) => setClass_id(e.target.value)}
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
            value={enrollment_date}
            onChange={(e) => setEnrollment_date(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)}
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
