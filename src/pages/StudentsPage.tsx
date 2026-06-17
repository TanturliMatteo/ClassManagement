import type { StudentWithClass } from "../types";

import { useState } from "react";
import { useStudents } from "../hooks/useStudents";
import StudentsTable from "../components/ui/StudentsTable";
import FormEditStudent from "../components/ui/FormEditStudent";

export default function StudentsPage() {
  const { data: students, isLoading, isError, error } = useStudents();
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithClass | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  return (
    <div>
      <StudentsTable
        students={students}
        onEditClick={(student) => setSelectedStudent(student)}
      />
      {selectedStudent && (
        <FormEditStudent
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
