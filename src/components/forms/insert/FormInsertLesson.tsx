import { useInsertLesson } from "../../../hooks/useInsertLesson";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useGetTeachers } from "../../../hooks/useGetTeachers";
import type { Lesson } from "../../../types";

interface FormInsertLessonProps {
  onClose: () => void;
  onLessonCreated: (classId: string, lessonId: string) => void;
}

const FormInsertLesson = ({
  onClose,
  onLessonCreated,
}: FormInsertLessonProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [class_id, setClass_id] = useState<string>("");
  const [teacher_id, setTeacher_id] = useState<string>("");

  const { mutate, isPending } = useInsertLesson();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { data: teachers, isLoading: isLoadingTeachers } = useGetTeachers();

  const handleConfirm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalDate =
      date ||
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);

    const newLesson = {
      title,
      date: finalDate,
      class_id,
      teacher_id,
      description: description || null,
    };
    mutate(newLesson, {
      onSuccess: (createdLesson: Lesson) => {
        if (class_id && createdLesson?.id) {
          onLessonCreated(class_id, createdLesson.id);
        }

        onClose();
      },
    });
  };

  const activeClasses = (classes || []).filter((cls) => cls.is_active);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <form onSubmit={handleConfirm}>
          <div className="column">
            <div className="row space-between">
              <input
                type="text"
                placeholder="Enter lesson title"
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
          </div>

          <textarea
            value={description}
            placeholder="Enter lesson description"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="description-textarea "
          />

          <div className="row">
            <button type="button" onClick={onClose} className="cancel-btn min">
              Cancel
            </button>

            <button type="submit" disabled={isPending} className="min">
              {isPending ? "Creating..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInsertLesson;
