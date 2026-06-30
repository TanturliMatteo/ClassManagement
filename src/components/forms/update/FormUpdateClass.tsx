import type { ClassWithTeacher } from "../../../types/index";
import { useState } from "react";
import { useUpdateClass } from "../../../hooks/useUpdateClass";
import { useGetTeachers } from "../../../hooks/useGetTeachers";

interface FormEditClassProps {
  classData: ClassWithTeacher | null;
  onClose: () => void;
}

const FormEditClass = ({ classData, onClose }: FormEditClassProps) => {
  const [name, setName] = useState(classData?.name || "");
  const [level, setLevel] = useState(classData?.level || "");
  const [details, setDetails] = useState(classData?.details || "");
  const [teacher_id, setTeacherId] = useState(classData?.teacher_id || "");
  const { mutate, isPending } = useUpdateClass();
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetTeachers();

  if (!classData) return <div className="modal-box">{"Class not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name,
      level,
      details,
      teacher_id,
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
            {teachersData?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
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
