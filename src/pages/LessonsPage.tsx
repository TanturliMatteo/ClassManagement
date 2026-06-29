import type { Lesson } from "../types/index";
import { useState } from "react";
import { useLessons } from "../hooks/useGetLessons";
import LessonsTable from "../components/ui/LessonsTable";
import FormEditLesson from "../components/forms/FormEditLesson";
import FormShowDescription from "../components/forms/FormShowDescription";
import TableDashboards from "../components/layout/TableDashboards";

export default function LessonsPage() {
  const { data: lessons, isLoading, isError, error } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredLessons =
    lessons?.filter((lesson) => {
      return (
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()),
        lesson.Classes?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setSelectedLesson(null)}
      />
      <LessonsTable
        lessons={filteredLessons}
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
