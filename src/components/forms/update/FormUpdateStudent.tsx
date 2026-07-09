import type { StudentWithForeign } from "../../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../../hooks/useUpdateStudent";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useDeleteStudent } from "../../../hooks/useDeleteStudent";

interface FormEditStudentProps {
  studentData: StudentWithForeign;
  onClose: () => void;
}

const FormEditStudent = ({ studentData, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState<string>(studentData.name);
  const [email, setEmail] = useState<string>(studentData.email);
  const [class_id, setClass_id] = useState<string>(studentData.class_id || "");
  const [enrollment_date, setEnrollment_date] = useState<string>(
    studentData.enrollment_date || "",
  );
  const [end_date, setEnd_date] = useState<string>(studentData.end_date || "");
  const [payment, setPayment] = useState<boolean>(studentData.payment || false);

  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();
  const { mutate, isPending } = useUpdateStudent();

  type SingleClass = NonNullable<typeof classes>[number];

  const activeClasses = (classes ?? []).filter(
    (cls: SingleClass) => cls.is_active,
  );

  if (!studentData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name,
      class_id: class_id === "" ? null : class_id,
      email,
      enrollment_date,
      end_date: end_date === "" ? null : end_date,
      payment,
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Class:
              <select
                value={class_id}
                onChange={(e) => setClass_id(e.target.value)}
                disabled={isLoadingClasses}
              >
                <option value="" disabled>
                  Select a class
                </option>
                <option value="">None</option>
                {activeClasses?.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
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
                onChange={(e) => setEnd_date(e.target.value)}
              />
            </label>

            <label>
              Payment:
              <select
                value={payment?.toString()}
                onChange={(e) => setPayment(e.target.value === "true")}
                required
              >
                <option value="" disabled>
                  Select status
                </option>
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
            onClick={handleConfirm}
            disabled={isPending}
            className="min"
          >
            {isPending ? "Salvataggio..." : "Confirm"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (studentData) {
                deleteStudent(studentData.id);
              }
              onClose();
            }}
            disabled={isDeleting}
            className="delete-btn min"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEditStudent;
