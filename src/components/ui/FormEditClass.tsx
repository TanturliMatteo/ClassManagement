import type { Class } from "../../types/index";
import { useState } from "react";
import { useUpdateClass } from "../../hooks/useUpdateClass";

interface FormEditClassProps {
  classData: Class | null;
  onClose: () => void;
}

const FormEditClass = ({ classData, onClose }: FormEditClassProps) => {
  const [name, setName] = useState(classData?.name || "");
  const [level, setLevel] = useState(classData?.level || "");
  const [details, setDetails] = useState(classData?.details || "");
  const [teachers, setTeachers] = useState(classData?.teachers || "");
  const { mutate, isPending } = useUpdateClass();

  if (!classData) return <div className="modal-box">{"Class not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name,
      level: level,
      details: details,
      teachers: teachers,
    };

    mutate(
      { id: classData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
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
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default FormEditClass;
