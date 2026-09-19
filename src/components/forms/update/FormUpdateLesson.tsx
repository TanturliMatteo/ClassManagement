import type { Lesson } from "../../../types/index";
import { useState } from "react";
import { useUpdateLesson } from "../../../hooks/useUpdateLessons";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useDeleteLesson } from "../../../hooks/useDeleteLesson";
import { useGetTeachers } from "../../../hooks/useGetTeachers";

interface FormEditLessonProps {
  lessonData: Lesson;
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
  const [title, setTitle] = useState<string>(lessonData?.title || "");
  const [date, setDate] = useState<string>(
    formatDateForInput(lessonData?.date) || "",
  );
  const [description, setDescription] = useState<string>(
    lessonData?.description || "",
  );
  const [class_id, setClass_id] = useState<string>(lessonData?.class_id || "");
  const [teacher_id, setTeacher_id] = useState<string>(
    lessonData?.teacher_id || "",
  );

  // 🌟 Stato per la conferma eliminazione
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { data: teachers, isLoading: isLoadingTeachers } = useGetTeachers();
  const { mutate: deleteLesson, isPending: isDeleting } = useDeleteLesson();
  const { mutate, isPending } = useUpdateLesson();

  const activeClasses = (classes || []).filter((cls) => cls.is_active);

  if (!lessonData) return <div className="modal-box">{"Lesson not found"}</div>;

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToUpdate = {
      title,
      date,
      description: description || null,
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

  if (showDeleteConfirm) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <div
            className="column"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              marginTop: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Sei sicuro? L'eliminazione della lezione comporta la rimozione di
            tutti i dati associati.
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="cancel-btn min"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (lessonData) deleteLesson(lessonData.id);
                onClose();
              }}
              disabled={isDeleting}
              className="delete-btn min"
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <form onSubmit={handleConfirm}>
          <div className="column">
            <div className="row space-between">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <select
                value={class_id}
                onChange={(e) => setClass_id(e.target.value)}
                disabled={isLoadingClasses}
                required
              >
                <option value="" disabled>
                  Select a class
                </option>
                {activeClasses?.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>

              <select
                value={teacher_id}
                onChange={(e) => setTeacher_id(e.target.value)}
                disabled={isLoadingTeachers}
                required
              >
                <option value="" disabled>
                  Select a teacher
                </option>
                {teachers?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={description}
              placeholder="Update Lesson Description"
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="description-textarea ReadOnly"
            />
          </div>

          <div className="row space-between">
            <button type="button" onClick={onClose} className="cancel-btn min">
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="delete-btn min"
            >
              Delete
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

export default FormEditLesson;
