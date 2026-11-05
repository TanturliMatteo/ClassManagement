import type { Student } from "../types";

/**
 * True se lo studente risultava iscritto nel giorno della lezione:
 * iscrizione non successiva e fine corso non precedente a quel giorno.
 * Il confronto avviene sul giorno locale (YYYY-MM-DD) per evitare
 * slittamenti di fuso orario.
 */
const isStudentActiveOn = (
  student: Pick<Student, "enrollment_date" | "end_date">,
  lessonDate: string | null | undefined,
): boolean => {
  if (!lessonDate) return true;

  const lesson = new Date(lessonDate);
  if (Number.isNaN(lesson.getTime())) return true;

  const day = lesson.toLocaleDateString("sv-SE");

  if (student.enrollment_date && student.enrollment_date.slice(0, 10) > day) {
    return false;
  }
  if (student.end_date && student.end_date.slice(0, 10) < day) {
    return false;
  }
  return true;
};

export default isStudentActiveOn;
