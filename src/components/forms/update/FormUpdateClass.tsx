import type { Class } from "../../../types/index";
import { useState } from "react";
import { useUpdateClass } from "../../../hooks/useUpdateClass";
import { useGetTeachers } from "../../../hooks/useGetTeachers";
import { useDeleteClass } from "../../../hooks/useDeleteClass";

interface FormEditClassProps {
  classData: Class | null;
  onClose: () => void;
}

const FormEditClass = ({ classData, onClose }: FormEditClassProps) => {
  const [name, setName] = useState(classData?.name || "");
  const [level, setLevel] = useState(classData?.level || "");
  const [details, setDetails] = useState(classData?.details || "");
  const [start_date, setStartDate] = useState(classData?.start_date || "");
  const [end_date, setEndDate] = useState(classData?.end_date || "");
  const [teacher_id, setTeacherId] = useState<string | null>(
    classData?.teacher_id || null,
  );
  const { mutate, isPending } = useUpdateClass();
  const { mutate: deleteClass, isPending: isDeleting } = useDeleteClass();
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetTeachers();

  if (!classData) return <div className="modal-box">{"Class not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name,
      level,
      details,
      teacher_id,
      start_date,
      end_date,
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
          Start Date:
          <input
            type="date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <label>
          teacher:
          <select
            value={teacher_id ?? ""}
            onChange={(e) => setTeacherId(e.target.value || null)}
            disabled={isLoadingTeachers}
            required
          >
            <option value="" disabled>
              Select a teacher
            </option>
            {teachersData?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <button type="button" onClick={onClose} className="cancel-btn">
          Cancel
        </button>

        <button type="button" onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Updating..." : "Confirm"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (classData) {
              deleteClass(classData.id);
            }
            {
              onClose();
            }
          }}
          disabled={isDeleting}
          className="delete-btn"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default FormEditClass;
