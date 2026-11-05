import { useInsertTeacher } from "../../../hooks/useInsertTeacher";
import { useState } from "react";

interface FormInsertTeacherProps {
  onClose: () => void;
}

const FormInsertTeacher = ({ onClose }: FormInsertTeacherProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { mutate, isPending } = useInsertTeacher();

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita il ricaricamento della pagina
    // Secondo controllo, indipendente dalla validazione del browser.
    if (!name.trim() || !email.trim()) return;

    const newTeacher = {
      name: name.trim(),
      email: email.trim(),
    };
    mutate(newTeacher, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
        <form onSubmit={handleConfirm}>
          <div className="column">
            <div className="row">
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  pattern=".*\S.*"
                  title="Il campo non può essere vuoto"
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
            <button type="button" onClick={onClose} className="cancel-btn min">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="min">
              {isPending ? "Salvataggio..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInsertTeacher;
