import type { Lesson } from "../types/index";
import { useState } from "react";
import { useLessons } from "../hooks/useGetLessons";
import LessonsTable from "../components/ui/LessonsTable";
import FormEditLesson from "../components/ui/FormEditLesson";

export default function LessonsPage() {
  const { data: lessons, isLoading, isError, error } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  return (
    <>
      <LessonsTable
        lessons={lessons}
        onEditClick={(lesson) => setSelectedLesson(lesson)}
      />
      {selectedLesson && (
        <FormEditLesson
          lessonData={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </>
  );
}
