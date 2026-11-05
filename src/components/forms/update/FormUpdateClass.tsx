import type { Class } from "../../../types/index";
import { useState } from "react";
import { useUpdateClass } from "../../../hooks/useUpdateClass";
import { useGetTeachers } from "../../../hooks/useGetTeachers";
import { useDeleteClass } from "../../../hooks/useDeleteClass";
import { useTakeOverClass } from "../../../hooks/useTakeOverClass";

interface FormEditClassProps {
  classData: Class;
  takeOver?: boolean | null;
  onClose: () => void;
}

const FormEditClass = ({
  classData,
  takeOver,
  onClose,
}: FormEditClassProps) => {
  const [name, setName] = useState(classData.name || "");
  const [level, setLevel] = useState(classData.level || "");
  const [details, setDetails] = useState(classData.details || "");

  const [start_date, setStartDate] = useState(
    takeOver ? classData.end_date || "" : classData.start_date || "",
  );
  const [end_date, setEndDate] = useState(
    takeOver ? "" : classData.end_date || "",
  );

  const [teacher_id, setTeacherId] = useState<string>(
    takeOver ? "" : classData.teacher_id || "",
  );
  const [isActive, setIsActive] = useState(classData.is_active || false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [num_student, setNumStudent] = useState<string>(
    classData.num_student ? classData.num_student.toString() : "",
  );

  const { mutate: updateClass, isPending } = useUpdateClass();
  const { mutate: deleteClass, isPending: isDeleting } = useDeleteClass();
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetTeachers();
  const { mutate: mutateTakeOver, isPending: isTakingOver } =
    useTakeOverClass();

  if (!classData) return <div className="modal-box">{"Class not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name.trim(),
      level: level.trim() || null,
      details: details.trim() || null,
      teacher_id: teacher_id || null,
      start_date: start_date || null,
      end_date: end_date || null,
      num_student: num_student.trim() || null,
      is_active: isActive,
    };
    updateClass(
      { id: classData.id, updates: dataToUpdate },
      { onSuccess: () => onClose() },
    );
  };

  const handleTakeOver = () => {
    mutateTakeOver(
      {
        id_vecchia_classe: classData.id,
        id_nuovo_prof: teacher_id || "",
        nuovo_inizio: start_date,
        nuovo_fine: end_date,
      },
      { onSuccess: () => onClose() },
    );
  };

  // Takeover: docente e date sono obbligatori (definiscono il nuovo periodo).
  // Modifica normale: solo il nome è obbligatorio.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Secondo controllo, indipendente dalla validazione del browser.
    if (takeOver) {
      if (!teacher_id || !start_date || !end_date) return;
      handleTakeOver();
    } else {
      if (!name.trim()) return;
      handleConfirm();
    }
  };

  if (showDeleteConfirm) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <div
            className="column"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              marginTop: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Sei sicuro? L'eliminazione della classe comporta la rimozione di
            tutte le lezioni associate.
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="cancel-btn min"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (classData) deleteClass(classData.id);
                onClose();
              }}
              disabled={isDeleting}
              className="delete-btn min"
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleSubmit}>
        <div className="column">
          <div>
            <div className="row">
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  pattern=".*\S.*"
                  title="Il campo non può essere vuoto"
                  readOnly={!!takeOver}
                  className={takeOver ? "readonly" : ""}
                />
              </label>

              <label>
                Level:
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  readOnly={!!takeOver}
                  className={takeOver ? "readonly" : ""}
                />
              </label>

              <label>
                Book:
                <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  readOnly={!!takeOver}
                  className={takeOver ? "readonly" : ""}
                />
              </label>

              <label>
                N° Students:
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={num_student}
                  onChange={(e) => setNumStudent(e.target.value)}
                  readOnly={!!takeOver}
                  className={takeOver ? "readonly" : ""}
                />
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  value={start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                  required={!!takeOver}
                />
              </label>

              <label>
                End Date:
                <input
                  type="date"
                  value={end_date}
                  min={start_date || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  required={!!takeOver}
                />
              </label>

              <label>
                Teacher:
                <select
                  value={teacher_id}
                  onChange={(e) => setTeacherId(e.target.value)}
                  disabled={isLoadingTeachers}
                  required={!!takeOver}
                >
                  <option value="" disabled={!!takeOver}>
                    Select a teacher
                  </option>
                  {teachersData?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Is Active:
                <select
                  value={isActive ? "yes" : "no"}
                  onChange={(e) => setIsActive(e.target.value === "yes")}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
          </div>

          <div className="row ">
            <button type="button" onClick={onClose} className="cancel-btn min">
              Cancel
            </button>

            {!takeOver && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                className="delete-btn min"
              >
                Delete
              </button>
            )}

            <button
              type="submit"
              disabled={isPending || isTakingOver}
              className="min"
            >
              {takeOver && isTakingOver
                ? "Taking Over..."
                : isPending
                  ? "Updating..."
                  : "Confirm"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditClass;
