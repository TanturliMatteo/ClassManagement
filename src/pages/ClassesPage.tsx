import { useGetClasses } from "../hooks/useGetClasses";
import ClassesTable from "../components/ui/ClassesTable";
import FormEditClass from "../components/forms/FormEditClass";
import type { Class } from "../types";
import { useState } from "react";
import TableDashboards from "../components/layout/TableDashboards";

const ClassesPage = () => {
  const { data: classes, isLoading, isError, error } = useGetClasses();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredClasses =
    classes?.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.teachers.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setSelectedClass(null)}
      />
      <ClassesTable
        classes={filteredClasses}
        onEditClick={(c) => setSelectedClass(c)}
        onShowClick={(c) => console.log(c)}
      />
      {selectedClass && (
        <FormEditClass
          classData={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </>
  );
};

export default ClassesPage;
