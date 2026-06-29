import type { StudentWithClass } from "../types";
import { useState } from "react";
import { useStudents } from "../hooks/useGetStudents";
import StudentsTable from "../components/ui/StudentsTable";
import FormEditStudent from "../components/forms/FormEditStudent";
import TableDashboards from "../components/layout/TableDashboards";

export default function StudentsPage() {
  const { data: students, isLoading, isError, error } = useStudents();
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithClass | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredStudents =
    students?.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setSelectedStudent(null)}
      />

      <StudentsTable
        students={filteredStudents}
        onEditClick={(student) => setSelectedStudent(student)}
      />
      {selectedStudent && (
        <FormEditStudent
          studentData={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
