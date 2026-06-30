import { useInsertStudent } from "../../../hooks/useInsertStudent";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormInsertStudentProps {
  onClose: () => void;
}

const FormInsertStudent = ({ onClose }: FormInsertStudentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [enrollment_date, setEnrollmentDate] = useState<string | null>(null);
  const [end_date, setEndDate] = useState<string | null>(null);
  const [class_id, setClass_id] = useState<string | null>(null);
  const { mutate, isPending } = useInsertStudent();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  const handleConfirm = () => {
    const newStudent = {
      name,
      email,
      class_id,
      enrollment_date,
      end_date,
    };
    mutate(newStudent, { onSuccess: () => onClose() });
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
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Class:
          <select
            value={class_id ?? ""}
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
            value={enrollment_date ?? ""}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={end_date ?? ""}
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

export default FormInsertStudent;
