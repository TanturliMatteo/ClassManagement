import type { StudentWithClass } from "../../types/index";
import { useState } from "react";

interface FormEditStudentProps {
  student: StudentWithClass | null;
  onClose: () => void;
}

const FormEditStudent = ({ student, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState(student?.name || "");

  if (!student) return <div className="modal-box">{"Student not found"}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="button" onClick={onClose} className="btn-action">
          Close
        </button>
      </div>
    </div>
  );
};

export default FormEditStudent;
