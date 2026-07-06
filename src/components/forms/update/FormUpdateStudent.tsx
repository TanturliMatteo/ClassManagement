import type { StudentWithClass } from "../../../types/index";
import { useState } from "react";
import { useUpdateStudent } from "../../../hooks/useUpdateStudent";
import { useGetClasses } from "../../../hooks/useGetClasses";
import { useDeleteStudent } from "../../../hooks/useDeleteStudent";

interface FormEditStudentProps {
  studentData: StudentWithClass | null;
  onClose: () => void;
}

const FormEditStudent = ({ studentData, onClose }: FormEditStudentProps) => {
  const [name, setName] = useState<string | null>(studentData?.name || null);
  const [email, setEmail] = useState<string | null>(studentData?.email || null);
  const [class_id, setClass_id] = useState<string | null>(
    studentData?.class_id || null,
  );
  const [enrollment_date, setEnrollment_date] = useState<string | null>(
    studentData?.enrollment_date || null,
  );
  const [end_date, setEnd_date] = useState<string | null>(
    studentData?.end_date || null,
  );
  const [payment, setPayment] = useState<boolean | null>(
    studentData?.payment ?? null,
  );
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();
  const { mutate, isPending } = useUpdateStudent();

  type SingleClass = NonNullable<typeof classes>[number];

  const latestClasses = Object.values(
    (classes || []).reduce<Record<string, SingleClass>>((acc, cls) => {
      const existing = acc[cls.name ?? ""];

      if (
        !existing ||
        new Date(cls.start_date ?? "") > new Date(existing.start_date ?? "")
      ) {
        acc[cls.name ?? ""] = cls;
      }

      return acc;
    }, {}),
  );

  if (!studentData)
    return <div className="modal-box">{"Student not found"}</div>;

  const handleConfirm = () => {
    const dataToUpdate = {
      name,
      class_id,
      email,
      enrollment_date,
      end_date,
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
            type="text"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Class:
          <select
            value={class_id ?? ""}
            onChange={(e) => setClass_id(e.target.value)}
            disabled={isLoadingClasses}
            required
          >
            <option value="" disabled>
              -- Select a class --
            </option>
            {latestClasses?.map((cls) => (
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
            value={enrollment_date ?? ""}
            onChange={(e) => setEnrollment_date(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={end_date ?? ""}
            onChange={(e) => setEnd_date(e.target.value)}
            required
          />
        </label>

        <label>
          Payment:
          <select
            value={payment?.toString() ?? ""}
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

        <button type="button" onClick={onClose} className="cancel-btn">
          Cancel
        </button>

        <button type="button" onClick={handleConfirm} disabled={isPending}>
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
          className="delete-btn"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default FormEditStudent;
