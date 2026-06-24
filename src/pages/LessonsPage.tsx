import type { Lesson } from "../types/index";
import { useState } from "react";
import { useLessons } from "../hooks/useGetLessons";
import LessonsTable from "../components/ui/LessonsTable";
import FormEditLesson from "../components/ui/FormEditLesson";
import FormShowDescription from "../components/ui/FormShowDescription";

export default function LessonsPage() {
  const { data: lessons, isLoading, isError, error } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showDescription, setShowDescription] = useState<string | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  return (
    <>
      <LessonsTable
        lessons={lessons}
        onEditClick={(lesson) => setSelectedLesson(lesson)}
        onDescriptionClick={(description) => setShowDescription(description)}
      />

      {selectedLesson && (
        <FormEditLesson
          lessonData={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}

      {showDescription && (
        <FormShowDescription
          description={showDescription}
          onClose={() => setShowDescription(null)}
        />
      )}
    </>
  );
}
