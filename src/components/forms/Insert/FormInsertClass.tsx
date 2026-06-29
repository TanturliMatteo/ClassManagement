import { useInsertClass } from "../../../hooks/useInsertClass";
import { useState } from "react";

interface FormInsertClassProps {
  onClose: () => void;
}

export const FormInsertClass = ({ onClose }: FormInsertClassProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [details, setDetails] = useState("");
  const [teachers, setTeachers] = useState("");
  const { mutate, isPending } = useInsertClass();

  const handleConfirm = () => {
    const newClass = {
      name,
      level,
      details,
      teachers,
    };

    mutate(newClass, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
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
          Level:
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </label>
        <label>
          Details:
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </label>
        <label>
          Teachers:
          <input
            type="text"
            value={teachers}
            onChange={(e) => setTeachers(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="button" onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default FormInsertClass;
