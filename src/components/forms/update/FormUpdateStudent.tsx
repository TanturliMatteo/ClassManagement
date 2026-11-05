import type { StudentWithForeign } from "../../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../../hooks/useUpdateStudent";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useDeleteStudent } from "../../../hooks/useDeleteStudent";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal";

interface FormEditStudentProps {
  studentData: StudentWithForeign;
  onClose: () => void;
}

const FormEditStudent = ({ studentData, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState<string>(studentData.name);
  const [email, setEmail] = useState<string>(studentData.email || "");
  const [class_id, setClass_id] = useState<string>(studentData.class_id || "");
  const [enrollment_date, setEnrollment_date] = useState<string>(
    studentData.enrollment_date || "",
  );
  const [end_date, setEnd_date] = useState<string>(studentData.end_date || "");
  const [payment, setPayment] = useState<boolean>(studentData.payment || false);
  const [birth_date, setBirthdate] = useState<string>(
    studentData.birth_date || "",
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const {
    mutate: deleteStudent,
    isPending: isDeleting,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteStudent();
  const { mutate, isPending } = useUpdateStudent();

  type SingleClass = NonNullable<typeof classes>[number];

  const activeClasses = (classes ?? []).filter(
    (cls: SingleClass) => cls.is_active,
  );

  if (!studentData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Secondo controllo, indipendente dalla validazione del browser.
    if (!name.trim() || !enrollment_date) return;

    const dataToUpdate = {
      name: name.trim(),
      class_id: class_id === "" ? null : class_id,
      email: email.trim() || null,
      enrollment_date,
      end_date: end_date === "" ? null : end_date,
      payment,
      birth_date: birth_date === "" ? null : birth_date,
    };

    mutate(
      { id: studentData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (showDeleteConfirm) {
    return (
      <ConfirmDeleteModal
        entity="student"
        id={studentData.id}
        title="Eliminare questo studente?"
        itemName={studentData.name}
        isDeleting={isDeleting}
        error={deleteError}
        onCancel={() => {
          resetDelete();
          setShowDeleteConfirm(false);
        }}
        onConfirm={() => deleteStudent(studentData.id, { onSuccess: onClose })}
      />
    );
  }

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleConfirm}>
        <div className="column">
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
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Class:
              <select
                value={class_id}
                onChange={(e) => setClass_id(e.target.value)}
                disabled={isLoadingClasses}
              >
                <option value="">Nessuna classe</option>
                {activeClasses?.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Birth Date:
              <input
                type="date"
                value={birth_date}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </label>

            <label>
              Enrollment Date:
              <input
                type="date"
                value={enrollment_date}
                onChange={(e) => setEnrollment_date(e.target.value)}
                required
              />
            </label>

            <label>
              End Date:
              <input
                type="date"
                value={end_date || ""}
                min={enrollment_date || undefined}
                onChange={(e) => setEnd_date(e.target.value)}
              />
            </label>

            <label>
              Payment:
              <select
                value={payment.toString()}
                onChange={(e) => setPayment(e.target.value === "true")}
                required
              >
                <option value="true">Paid</option>
                <option value="false">Not Paid</option>
              </select>
            </label>
          </div>
        </div>

        <div className="row">
          <button type="button" onClick={onClose} className="cancel-btn min">
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="delete-btn min"
          >
            Delete
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="min"
          >
            {isPending ? "Salvataggio..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditStudent;
