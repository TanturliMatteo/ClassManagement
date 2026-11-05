import { useInsertStudent } from "../../../hooks/useInsertStudent";
import { useState } from "react";
import { useGetClasses } from "../../../hooks/useGetClasses";

interface FormInsertStudentProps {
  onClose: () => void;
}

const FormInsertStudent = ({ onClose }: FormInsertStudentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  // Precompilata con la data di oggi (giorno locale), modificabile.
  const [enrollment_date, setEnrollmentDate] = useState<string>(() =>
    new Date().toLocaleDateString("sv-SE"),
  );
  const [end_date, setEndDate] = useState<string>("");
  const [class_id, setClass_id] = useState<string>("");
  const [payment, setPayment] = useState<boolean>(false);
  const [birth_date, setBirthdate] = useState<string>("");

  const { mutate, isPending } = useInsertStudent();
  const { data: classes, isLoading: isLoadingClasses } = useGetClasses();

  type SingleClass = NonNullable<typeof classes>[number];

  const activeClasses = (classes || []).filter(
    (cls: SingleClass) => cls.is_active,
  );

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    // Secondo controllo, indipendente dalla validazione del browser.
    if (!name.trim() || !enrollment_date) return;

    const newStudent = {
      name: name.trim(),
      email: email.trim() || null,
      class_id: class_id || null,
      enrollment_date,
      end_date: end_date || null,
      birth_date: birth_date || null,
      payment,
    };

    mutate(newStudent, { onSuccess: () => onClose() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <form onSubmit={handleConfirm}>
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
                  <option value="">Select class</option>
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
                  onChange={(e) => setEnrollmentDate(e.target.value)}
                  required
                />
              </label>

              <label>
                End Date:
                <input
                  type="date"
                  value={end_date}
                  min={enrollment_date || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
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

            <button type="submit" disabled={isPending} className="min">
              {isPending ? "Salvataggio..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInsertStudent;
