import { useInsertClass } from "../../../hooks/useInsertClass";
import { useState } from "react";
import { useGetTeachers } from "../../../hooks/useGetTeachers";

interface FormInsertClassProps {
  onClose: () => void;
}

export const FormInsertClass = ({ onClose }: FormInsertClassProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [details, setDetails] = useState("");
  const [teacher_id, setTeacherId] = useState("");
  const { mutate, isPending } = useInsertClass();
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetTeachers();

  const handleConfirm = () => {
    const newClass = { name, level, details, teacher_id };

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
          teacher:
          <select
            value={teacher_id}
            onChange={(e) => setTeacherId(e.target.value)}
            disabled={isLoadingTeachers}
            required
          >
            <option value="" disabled>
              -- Select a teacher --
            </option>
            {teachersData?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
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
