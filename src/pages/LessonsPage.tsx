import type { Lesson } from "../types/index";
import { useState } from "react";
import { useLessons } from "../hooks/useGetLessons";
import LessonsTable from "../components/ui/LessonsTable";
import FormEditLesson from "../components/forms/update/FormEditLesson";
import FormShowDescription from "../components/forms/update/FormShowDescription";
import TableDashboards from "../components/layout/TableDashboards";
import FormInsertLesson from "../components/forms/Insert/FormInsertLesson";

export default function LessonsPage() {
  const { data: lessons, isLoading, isError, error } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredLessons =
    lessons?.filter((l) => {
      const dataObj = new Date(l.date ? l.date : "");
      return (
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.Classes?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataObj.toLocaleDateString("it-IT").includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsAddingLesson(true)}
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
      {isAddingLesson && (
        <FormInsertLesson onClose={() => setIsAddingLesson(false)} />
      )}
    </>
  );
}
