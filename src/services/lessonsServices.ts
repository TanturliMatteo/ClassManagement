import { supabase } from "./supabase";
import type { LessonWithForeign, Lesson } from "../types";

export const createLesson = async (newLesson: Omit<Lesson, "id">) => {
  const { data, error } = await supabase
    .from("Lessons")
    .insert(newLesson as Lesson);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getLessons = async (): Promise<LessonWithForeign[]> => {
  const { data, error } = await supabase
    .from("Lessons")
    .select("*,Classes(name),Teachers(name)")
    .order("date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as LessonWithForeign[];
};

export const updateLesson = async (
  id: string,
  updates: Partial<LessonWithForeign>,
) => {
  const { data, error } = await supabase
    .from("Lessons")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteLesson = async (id: string) => {
  const { data, error } = await supabase.from("Lessons").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
