import { supabase } from "./supabase";
import type { LessonWithForeign, Lesson } from "../types";

export const createLesson = async (
  newLesson: Omit<Lesson, "id" | "created_at">,
): Promise<Lesson> => {
  const { data, error } = await supabase
    .from("Lessons")
    .insert(newLesson)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data as Lesson;
};

export const getLessons = async (): Promise<LessonWithForeign[]> => {
  const { data, error } = await supabase
    .from("Lessons")
    .select("*,Classes(name),Teachers(name)")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as LessonWithForeign[];
};

export const updateLesson = async (
  id: string,
  updates: Partial<Lesson>,
) => {
  const { data, error } = await supabase
    .from("Lessons")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteLesson = async (id: string) => {
  // .select() restituisce le righe eliminate: se è vuoto non è stato cancellato
  // nulla (record già rimosso o permessi RLS insufficienti).
  const { data, error } = await supabase
    .from("Lessons")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error(
      "nessun record eliminato (già rimosso o permessi insufficienti).",
    );
  }
  return data;
};
