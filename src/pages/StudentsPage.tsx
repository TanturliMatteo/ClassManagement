import type { StudentWithForeign } from "../types";
import { useState } from "react";
import { useGetStudents } from "../hooks/useGetStudents";
import StudentsTable from "../components/ui/StudentsTable";
import FormEditStudent from "../components/forms/update/FormUpdateStudent";
import TableDashboards from "../components/layout/TableDashboards";
import FormInsertStudent from "../components/forms/insert/FormInsertStudent";

export default function StudentsPage() {
  const { data: students, isLoading, isError, error } = useGetStudents();
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithForeign | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  const filteredStudents =
    students?.filter((s) => {
      const dataobj = new Date(s.enrollment_date ? s.enrollment_date : "");
      const dataObjEnd = new Date(s.end_date ? s.end_date : "");
      return (
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.Classes?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataobj
          .toLocaleDateString("it-IT")
          .includes(searchTerm.toLowerCase()) ||
        dataObjEnd
          .toLocaleDateString("it-IT")
          .includes(searchTerm.toLowerCase()) ||
        (s.payment ? "done" : "missed")
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <TableDashboards
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsAddingStudent(true)}
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
      {isAddingStudent && (
        <FormInsertStudent onClose={() => setIsAddingStudent(false)} />
      )}
    </>
  );
}
