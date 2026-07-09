import { useInsertTeacher } from "../../../hooks/useInsertTeacher";
import { useState } from "react";

interface FormInsertTeacherProps {
  onClose: () => void;
}

const FormInsertTeacher = ({ onClose }: FormInsertTeacherProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { mutate, isPending } = useInsertTeacher();

  const handleConfirm = () => {
    const newTeacher = {
      name,
      email,
    };
    mutate(newTeacher, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
        <div className="column">
          <div className="row">
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="row">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="button" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Salvataggio..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInsertTeacher;
