import { useInsertTeacher } from "../../../hooks/useInsertTeacher";
import { useState } from "react";

interface FormInsertTeacherProps {
  onClose: () => void;
}

const FormInsertTeacher = ({ onClose }: FormInsertTeacherProps) => {
  const [name, setName] = useState<string | null>(null);
  const [admin_access, setAdmin_access] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const { mutate, isPending } = useInsertTeacher();

  const handleConfirm = () => {
    const newTeacher = {
      name,
      email,
      admin_access: false,
    };
    mutate(newTeacher, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
        <label>
          Name:
          <input
            type="text"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Admin Privileges:
          <select
            value={admin_access ?? ""}
            onChange={(e) => setAdmin_access(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a class --
            </option>
            <option value="true">Sì</option>
            <option value="false">No</option>
          </select>
        </label>

        <button type="button" onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <button type="button" onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Salvataggio..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default FormInsertTeacher;
