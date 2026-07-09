import { useInsertStudent } from "../../../hooks/useInsertStudent";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormInsertStudentProps {
  onClose: () => void;
}

const FormInsertStudent = ({ onClose }: FormInsertStudentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [enrollment_date, setEnrollmentDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [class_id, setClass_id] = useState<string>("");
  const [payment, setPayment] = useState<boolean>(false);

  const { mutate, isPending } = useInsertStudent();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  type SingleClass = NonNullable<typeof classes>[number];

  const activeClasses = (classes || []).filter(
    (cls: SingleClass) => cls.is_active,
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
      class_id: class_id || null,
      enrollment_date: finalEnrollmentDate,
      end_date: end_date || null,
      payment,
    };
    mutate(newStudent, { onSuccess: () => onClose() });
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
                  Select class
                </option>
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
                onChange={(e) => setEnrollmentDate(e.target.value)}
                required
              />
            </label>

            <label>
              End Date:
              <input
                type="date"
                value={end_date}
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
                  payment status
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
        </div>
      </div>
    </div>
  );
};

export default FormInsertStudent;
