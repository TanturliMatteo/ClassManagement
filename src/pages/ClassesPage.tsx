import { useGetClasses } from "../hooks/useGetClasses";
import ClassesTable from "../components/ui/ClassesTable";
import FormEditClass from "../components/forms/update/FormUpdateClass";
import FormInsertClass from "../components/forms/insert/FormInsertClass";
import type { Class } from "../types";
import { useState } from "react";
import TableDashboards from "../components/layout/TableDashboards";

const ClassesPage = () => {
  const { data: classes, isLoading, isError, error } = useGetClasses();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isInsertFormOpen, setIsInsertFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [takeOver, setTakeOver] = useState<boolean | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const search = searchTerm.toLowerCase().trim();

  const filteredClasses =
    classes?.filter((c) => {
      if (!search) return true;

      return (
        c.name?.toLowerCase().includes(search) ||
        c.level?.toLowerCase().includes(search) ||
        c.details?.toLowerCase().includes(search) ||
        c.start_date?.toLowerCase().includes(search) ||
        c.end_date?.toLowerCase().includes(search) ||
        c.Teachers?.name?.toLowerCase().includes(search) ||
        (c.is_active ? "yes" : "no").includes(search)
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsInsertFormOpen(true)}
      />
      <ClassesTable
        classes={filteredClasses}
        onEditClick={(c) => setSelectedClass(c)}
        onTakeOverClick={() => setTakeOver(true)}
      />
      {selectedClass && (
        <FormEditClass
          classData={selectedClass}
          takeOver={takeOver}
          onClose={() => {
            setSelectedClass(null);
            setTakeOver(false);
          }}
        />
      )}
      {isInsertFormOpen && (
        <FormInsertClass onClose={() => setIsInsertFormOpen(false)} />
      )}
    </>
  );
};

export default ClassesPage;
