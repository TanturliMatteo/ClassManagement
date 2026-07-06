import { useInsertStudent } from "../../../hooks/useInsertStudent";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormInsertStudentProps {
  onClose: () => void;
}

const FormInsertStudent = ({ onClose }: FormInsertStudentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [enrollment_date, setEnrollmentDate] = useState<string | null>(null);
  const [end_date, setEndDate] = useState<string | null>(null);
  const [class_id, setClass_id] = useState<string | null>(null);
  const [payment, setPayment] = useState<boolean | null>(null);
  const { mutate, isPending } = useInsertStudent();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

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

  const handleConfirm = () => {
    const finalEnrollmentDate =
      enrollment_date ||
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    const newStudent = {
      name,
      email,
      class_id,
      enrollment_date: finalEnrollmentDate,
      end_date,
      payment,
    };
    mutate(newStudent, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box ">
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
            onChange={(e) => setEnrollmentDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={end_date ?? ""}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <label>
          Payment:
          <select
            value={payment === null ? "" : payment ? "true" : "false"}
            onChange={(e) => setPayment(e.target.value === "true")}
            required
          >
            <option value="" disabled>
              -- Select payment status --
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
      </div>
    </div>
  );
};

export default FormInsertStudent;
