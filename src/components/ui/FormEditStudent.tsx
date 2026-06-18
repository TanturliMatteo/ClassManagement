import type { StudentWithClass } from "../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";

interface FormEditStudentProps {
  student: StudentWithClass | null;
  onClose: () => void;
}

const FormEditStudent = ({ student, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [className, setClassName] = useState(student?.Classes?.name || "");
  const [enrollmentDate, setEnrollmentDate] = useState(
    student?.enrollment_date || "",
  );
  const [endDate, setEndDate] = useState(student?.end_date || "");

  const { mutate, isPending } = useUpdateStudent();

  if (!student) return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name,
      email: email,
      enrollment_date: enrollmentDate,
      end_date: endDate,
    };

    mutate(
      { id: student.id, updates: dataToUpdate },
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
            className="border p-2 rounded w-full"
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
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
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
