import type { Teacher } from "../types";
import { useState } from "react";
import { useGetTeachers } from "../hooks/useGetTeachers";
import TeachersTable from "../components/ui/TeachersTable";
import FormUpdateTeacher from "../components/forms/update/FormUpdateTeacher";
import TableDashboards from "../components/layout/TableDashboards";
import FormInsertTeacher from "../components/forms/insert/FormInsertTeacher";

export default function TeachersPage() {
  const { data: teachers, isLoading, isError, error } = useGetTeachers();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredTeachers =
    teachers?.filter((t) => {
      return (
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.isAdmin.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsAddingTeacher(true)}
      />

      <TeachersTable
        teachers={filteredTeachers}
        onEditClick={(teacher) => setSelectedTeacher(teacher)}
      />
      {selectedTeacher && (
        <FormUpdateTeacher
          teacherData={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
      {isAddingTeacher && (
        <FormInsertTeacher onClose={() => setIsAddingTeacher(false)} />
      )}
    </>
  );
}
