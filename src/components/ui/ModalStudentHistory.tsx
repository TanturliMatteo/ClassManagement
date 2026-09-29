import { useEffect, useState } from "react";
import type { StudentWithForeign } from "../../types";
import { supabase } from "../../services/supabase";
import truncateWords from "../../utils/truncateWords";
import toDateTimeITA from "../../utils/toDateTime.ITA";

interface LessonHistory {
  is_present: boolean;
  Lessons: {
    title: string;
    description: string | null;
    date: string;
    Classes: { name: string } | null;
    Teachers: { name: string } | null;
  } | null;
}

export default function ModalStudentHistory({
  student,
  onClose,
}: {
  student: StudentWithForeign;
  onClose: () => void;
}) {
  const [history, setHistory] = useState<LessonHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDescription, setActiveDescription] = useState<string | null>(
    null,
  );

  useEffect(() => {
    supabase
      .from("Attendances")
      .select(
        "is_present, Lessons(title, description, date, Classes(name), Teachers(name))",
      )
      .eq("student_id", student.id)
      .then(({ data }) => {
        setHistory((data as unknown as LessonHistory[]) || []);
        setLoading(false);
      });
  }, [student.id]);

  return (
    <>
      {/* Modale Principale Storico */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box ds" onClick={(e) => e.stopPropagation()}>
          <h3 style={{ marginBottom: "1rem" }}>
            Storico Lezioni: {student.name}
          </h3>

          {loading ? (
            <div>Caricamento...</div>
          ) : history.length === 0 ? (
            <div>Nessuna lezione trovata per questo studente.</div>
          ) : (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Class</th>
                    <th>Teacher</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, idx) => (
                    <tr key={idx}>
                      <td className="table-td-max-width">
                        {item.Lessons?.title}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            setActiveDescription(
                              item.Lessons?.description ||
                                "Nessuna descrizione",
                            )
                          }
                          style={{ color: "black", background: "none" }}
                          className="table-td-max-width"
                        >
                          {truncateWords(item.Lessons?.description ?? "", 3)}
                        </button>
                      </td>
                      <td>{toDateTimeITA(item.Lessons?.date)}</td>
                      <td>{item.Lessons?.Classes?.name || "-"}</td>
                      <td>{item.Lessons?.Teachers?.name || "-"}</td>
                      <td
                        style={{
                          color: item.is_present ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {item.is_present ? "Presente" : "Assente"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className="cancel-btn"
            onClick={onClose}
            style={{ marginTop: "1rem", alignSelf: "flex-end" }}
          >
            Chiudi
          </button>
        </div>
      </div>

      {/* Popup Descrizione (stile identico a LessonsTable) */}
      {activeDescription !== null && (
        <div
          className="modal-overlay"
          style={{ zIndex: 1100 }}
          onClick={() => setActiveDescription(null)}
        >
          <div
            className="modal-box description-box ds"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Descrizione Lezione</h3>
            <textarea
              className="description-textarea readonly"
              readOnly
              value={activeDescription}
            />
            <button
              className="cancel-btn description-button"
              onClick={() => setActiveDescription(null)}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
