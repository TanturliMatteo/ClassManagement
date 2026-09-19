import { useInsertClass } from "../../../hooks/useInsertClass";
import { useState } from "react";
import { useGetTeachers } from "../../../hooks/useGetTeachers";

interface FormInsertClassProps {
  onClose: () => void;
}

export const FormInsertClass = ({ onClose }: FormInsertClassProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [details, setDetails] = useState("");
  const [teacher_id, setTeacherId] = useState<string>("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [num_student, setNumStudent] = useState<string>("");
  const { mutate, isPending } = useInsertClass();
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetTeachers();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault(); // 🌟 Evita il reload della pagina

    const newClass = {
      name,
      level: level || null,
      details: details || null,
      teacher_id: teacher_id || null,
      start_date: start_date || null,
      end_date: end_date || null,
      num_student: num_student || null,
      is_active: true,
    };

    mutate(newClass, {
      onSuccess: () => {
        onClose();
      },
    });
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
                />
              </label>

              <label>
                Level:
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </label>

              <label>
                Book:
                <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>

              <label>
                N° Students:
                <input
                  type="text"
                  value={num_student}
                  onChange={(e) => setNumStudent(e.target.value)}
                />
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  value={start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>

              <label>
                End Date:
                <input
                  type="date"
                  value={end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>

              <label>
                Teacher:
                <select
                  value={teacher_id}
                  onChange={(e) => setTeacherId(e.target.value)}
                  disabled={isLoadingTeachers}
                >
                  <option value="">Select a teacher</option>
                  {teachersData?.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="row">
            <button type="button" onClick={onClose} className="cancel-btn min">
              Cancel
            </button>

            <button type="submit" disabled={isPending} className="min">
              {isPending ? "Creating..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInsertClass;
