import { supabase } from "./supabase";

export type DeleteEntity = "student" | "class" | "lesson" | "teacher";

export interface DeleteImpact {
  /** Se valorizzato, l'eliminazione è bloccata e il testo spiega perché. */
  blockedReason: string | null;
  /** Conseguenze da mostrare all'utente prima della conferma. */
  consequences: string[];
}

const countRows = async (
  table: string,
  column: string,
  id: string,
): Promise<number> => {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(column, id);
  if (error) throw new Error(error.message);
  return count ?? 0;
};

const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

/**
 * Controlla cosa verrebbe coinvolto dall'eliminazione, in base alle foreign key:
 * - Attendances → Lessons / Students: ON DELETE CASCADE
 * - Lessons → Classes: ON DELETE CASCADE
 * - Lessons.teacher_id è NOT NULL, quindi un docente con lezioni non si può eliminare
 * - Students.class_id e Classes.teacher_id: ON DELETE SET NULL
 */
export const getDeleteImpact = async (
  entity: DeleteEntity,
  id: string,
): Promise<DeleteImpact> => {
  switch (entity) {
    case "student": {
      const attendances = await countRows("Attendances", "student_id", id);
      return {
        blockedReason: null,
        consequences:
          attendances > 0
            ? [
                `Verranno eliminate anche ${plural(attendances, "presenza registrata", "presenze registrate")}: lo storico dello studente andrà perso.`,
                "Se lo studente ha solo terminato il corso, imposta invece la End Date.",
              ]
            : ["Lo studente non ha presenze registrate."],
      };
    }

    case "lesson": {
      const attendances = await countRows("Attendances", "lesson_id", id);
      return {
        blockedReason: null,
        consequences:
          attendances > 0
            ? [
                `Verrà eliminato anche l'appello della lezione (${plural(attendances, "presenza", "presenze")}).`,
              ]
            : ["La lezione non ha ancora un appello."],
      };
    }

    case "class": {
      const [lessons, students] = await Promise.all([
        countRows("Lessons", "class_id", id),
        countRows("Students", "class_id", id),
      ]);
      if (lessons > 0) {
        return {
          blockedReason: `La classe ha ${plural(lessons, "lezione", "lezioni")}: eliminandola verrebbero cancellate anche le lezioni e il loro appello. Per chiuderla imposta "Is Active" su No.`,
          consequences: [],
        };
      }
      return {
        blockedReason: null,
        consequences:
          students > 0
            ? [
                `${plural(students, "studente resterà", "studenti resteranno")} senza classe.`,
              ]
            : ["La classe non ha lezioni né studenti."],
      };
    }

    case "teacher": {
      const [lessons, classes] = await Promise.all([
        countRows("Lessons", "teacher_id", id),
        countRows("Classes", "teacher_id", id),
      ]);
      if (lessons > 0) {
        return {
          blockedReason: `Il docente ha ${plural(lessons, "lezione registrata", "lezioni registrate")} e non può essere eliminato: ogni lezione deve mantenere il proprio docente.`,
          consequences: [],
        };
      }
      return {
        blockedReason: null,
        consequences:
          classes > 0
            ? [
                `${plural(classes, "classe resterà", "classi resteranno")} senza docente.`,
              ]
            : ["Il docente non ha classi né lezioni."],
      };
    }
  }
};
