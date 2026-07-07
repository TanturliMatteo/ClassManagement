import type { Lesson } from "../types/index";
import { useState } from "react";
import { useGetLessons } from "../hooks/useGetLessons";
import LessonsTable from "../components/ui/LessonsTable";
import FormEditLesson from "../components/forms/update/FormUpdateLesson";
import FormShowDescription from "../components/forms/update/FormShowDescription";
import TableDashboards from "../components/layout/TableDashboards";
import FormInsertLesson from "../components/forms/insert/FormInsertLesson";
import FormInsertAttendances from "../components/forms/insert/FormInsertAttendances";
import FormUpdateAttendances from "../components/forms/update/formUpdateAttendances";

export default function LessonsPage() {
  const { data: lessons, isLoading, isError, error } = useGetLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [activeAttendanceContext, setActiveAttendanceContext] = useState<{
    classId: string;
    lessonId: string;
  } | null>(null);
  const [updateAttendanceMap, setUpdateAttendanceMap] = useState<{
    classId: string;
    lessonId: string;
    readOnly: boolean;
  } | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredLessons =
    lessons?.filter((l) => {
      const dataObj = new Date(l.date ? l.date : "");
      return (
        l.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.Classes?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataObj
          .toLocaleDateString("it-IT")
          .includes(searchTerm.toLowerCase()) ||
        l.Teachers?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
        onAttendanceClick={(lesson) => {
          setUpdateAttendanceMap({
            classId: lesson.class_id ?? "",
            lessonId: lesson.id,
            readOnly: true,
          });
        }}
      />

      {showDescription && (
        <FormShowDescription
          description={showDescription}
          onClose={() => setShowDescription(null)}
        />
      )}

      {isAddingLesson && (
        <FormInsertLesson
          onClose={() => setIsAddingLesson(false)}
          onLessonCreated={(classId, lessonId) => {
            setActiveAttendanceContext({ classId, lessonId });
          }}
        />
      )}

      {activeAttendanceContext && (
        <FormInsertAttendances
          classId={activeAttendanceContext.classId}
          lessonId={activeAttendanceContext.lessonId}
          onClose={() => setActiveAttendanceContext(null)}
        />
      )}

      {selectedLesson && (
        <FormEditLesson
          lessonData={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onLessonUpdated={(classId, lessonId) => {
            setUpdateAttendanceMap({
              classId,
              lessonId,
              readOnly: false,
            });
          }}
        />
      )}

      {updateAttendanceMap && (
        <FormUpdateAttendances
          classId={updateAttendanceMap.classId}
          lessonId={updateAttendanceMap.lessonId}
          readOnly={updateAttendanceMap.readOnly}
          onClose={() => setUpdateAttendanceMap(null)}
        />
      )}
    </>
  );
}
