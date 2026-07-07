import type { Lesson } from "../../../types/index";
import { useState } from "react";
import { useUpdateLesson } from "../../../hooks/useUpdateLessons";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useDeleteLesson } from "../../../hooks/useDeleteLesson";
import { useGetTeachers } from "../../../hooks/useGetTeachers";

interface FormEditLessonProps {
  lessonData: Lesson | null;
  onClose: () => void;
  onLessonUpdated?: (classId: string, lessonId: string) => void;
}

const formatDateForInput = (isoString: string | null | undefined): string => {
  if (!isoString) return "";
  const d = new Date(isoString);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

const FormEditLesson = ({
  lessonData,
  onClose,
  onLessonUpdated,
}: FormEditLessonProps) => {
  const [title, setTitle] = useState<string | null>(lessonData?.title || null);
  const [date, setDate] = useState<string | null>(
    formatDateForInput(lessonData?.date) || null,
  );
  const [description, setDescription] = useState<string | null>(
    lessonData?.description || null,
  );
  const [class_id, setClass_id] = useState<string | null>(
    lessonData?.class_id || null,
  );
  const [teacher_id, setTeacher_id] = useState<string | null>(
    lessonData?.teacher_id || null,
  );
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { data: teachers, isLoading: isLoadingTeachers } = useGetTeachers();
  const { mutate: deleteLesson, isPending: isDeleting } = useDeleteLesson();
  const { mutate, isPending } = useUpdateLesson();

  type SingleClass = NonNullable<typeof classes>[number];

  const latestClasses = Object.values(
    (classes || []).reduce<Record<string, SingleClass>>((acc, cls) => {
      const existing = acc[cls.name ?? ""];

      if (
        !existing ||
        new Date(cls.start_date ?? "") > new Date(existing.start_date ?? "")
      ) {
        acc[cls.name ?? ""] = cls;
      }

      return acc;
    }, {}),
  );

  if (!lessonData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      title,
      date,
      description,
      class_id,
      teacher_id,
    };

    mutate(
      { id: lessonData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          if (class_id && lessonData?.id)
            onLessonUpdated?.(class_id, lessonData.id);
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
              value={title ?? ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Date:
            <input
              type="datetime-local"
              value={date ?? ""}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Class:
            <select
              value={class_id ?? ""}
              onChange={(e) => setClass_id(e.target.value)}
              disabled={isLoadingClasses}
              required
            >
              <option value="" disabled>
                -- Select a class --
              </option>
              {latestClasses?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Teacher:
          <select
            value={teacher_id ?? ""}
            onChange={(e) => setTeacher_id(e.target.value)}
            disabled={isLoadingTeachers}
            required
          >
            <option value="" disabled>
              -- Select a teacher --
            </option>
            {teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>

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
            {isPending ? "Salvataggio..." : "Confirm"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (lessonData) {
                deleteLesson(lessonData.id);
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
    </div>
  );
};

export default FormEditLesson;
