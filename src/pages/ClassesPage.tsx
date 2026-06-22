import { useGetClasses } from "../hooks/useGetClasses";
import ClassesTable from "../components/ui/ClassesTable";
import FormEditClass from "../components/ui/FormEditClass";
import type { Class } from "../types";
import { useState } from "react";

const ClassesPage = () => {
  const { data: classes, isLoading, isError, error } = useGetClasses();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (isError) return <div>Errore: {error.message}</div>;

  return (
    <>
      <ClassesTable
        classes={classes}
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
