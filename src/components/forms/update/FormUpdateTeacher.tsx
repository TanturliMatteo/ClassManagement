import type { Teacher } from "../../../types/index";
import { useState } from "react";
import { useUpdateTeacher } from "../../../hooks/useUpdateTeacher";
import { useDeleteTeacher } from "../../../hooks/useDeleteTeacher";

interface FormUpdateTeacherProps {
  teacherData: Teacher | null;
  onClose: () => void;
}

const FormUpdateTeacher = ({
  teacherData,
  onClose,
}: FormUpdateTeacherProps) => {
  const [name, setName] = useState<string | null>(teacherData?.name || null);
  const [admin_access, setAdmin_access] = useState<string | null>(
    teacherData?.admin_access?.toString() || null,
  );
  const [email, setEmail] = useState<string | null>(teacherData?.email || null);
  const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher();
  const { mutate, isPending } = useUpdateTeacher();

  if (!teacherData)
    return <div className="modal-box">{"Teacher not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name,
      admin_access: admin_access === "true",
      email,
    };

    mutate(
      { id: teacherData.id, updates: dataToUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
        <label>
          Name:
          <input
            type="text"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Admin Privileges:
          <select
            value={admin_access ?? ""}
            onChange={(e) => setAdmin_access(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a class --
            </option>
            <option value="true">Sì</option>
            <option value="false">No</option>
          </select>
        </label>

        <button type="button" onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <button type="button" onClick={handleConfirm} disabled={isPending}>
          {isPending ? "Salvataggio..." : "Confirm"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (teacherData) {
              deleteTeacher(teacherData.id);
            }
            onClose();
          }}
          disabled={isDeleting}
          className="delete-btn"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default FormUpdateTeacher;
