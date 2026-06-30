import type { Lesson } from "../../../types/index";
import { useState } from "react";
import { useUpdateLesson } from "../../../hooks/useUpdateLessons";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormEditLessonProps {
  lessonData: Lesson | null;
  onClose: () => void;
}

const FormEditLesson = ({ lessonData, onClose }: FormEditLessonProps) => {
  const [title, setTitle] = useState(lessonData?.title || "");
  const [date, setDate] = useState(lessonData?.date || "");
  const [description, setDescription] = useState(lessonData?.description || "");
  const [classId, setClassId] = useState(lessonData?.class_id || "");
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { mutate, isPending } = useUpdateLesson();

  if (!lessonData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      title: title,
      date: date,
      description: description,
      class_id: classId,
    };

    mutate(
      { id: lessonData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Class:
            <select
              value={classId}
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
              value={description}
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
          <button type="button" onClick={onClose}>
            Close
          </button>

          <button type="button" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Salvataggio..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEditLesson;
