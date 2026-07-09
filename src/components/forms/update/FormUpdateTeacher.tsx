import type { Teacher } from "../../../types/index";
import { useState } from "react";
import { useUpdateTeacher } from "../../../hooks/useUpdateTeacher";
import { useDeleteTeacher } from "../../../hooks/useDeleteTeacher";

interface FormUpdateTeacherProps {
  teacherData: Teacher;
  onClose: () => void;
}

const FormUpdateTeacher = ({
  teacherData,
  onClose,
}: FormUpdateTeacherProps) => {
  const [name, setName] = useState<string>(teacherData.name || "");
  const [email, setEmail] = useState<string>(teacherData.email || "");

  const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher();
  const { mutate, isPending } = useUpdateTeacher();

  if (!teacherData)
    return <div className="modal-box">{"Teacher not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name: name,
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
        <div className="column">
          <div className="row">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="row">
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
    </div>
  );
};

export default FormUpdateTeacher;
