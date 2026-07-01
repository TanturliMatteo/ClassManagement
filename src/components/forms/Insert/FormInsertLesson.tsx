import { useInsertLesson } from "../../../hooks/useInsertLesson";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormInsertLessonProps {
  onClose: () => void;
}

const FormInsertLesson = ({ onClose }: FormInsertLessonProps) => {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [classId, setClassId] = useState<string | null>(null);
  const { mutate, isPending } = useInsertLesson();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  const handleConfirm = () => {
    const newLesson = {
      title,
      description,
      date,
      class_id: classId,
    };
    mutate(newLesson, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-box"
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          width: "60%",
        }}
      >
        <div className="description-form-first-row">
          <label>
            Title:
            <input
              type="text"
              value={title ?? ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              value={date ?? ""}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Class:
            <select
              value={classId ?? ""}
              onChange={(e) => setClassId(e.target.value)}
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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label>
            Description:
            <textarea
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="description-textarea ReadOnly"
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>

          <button type="button" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Creating..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInsertLesson;
