import { supabase } from "./supabase";
import type { LessonWithClass, Lesson } from "../types";

export const createLesson = async (newLesson: Lesson) => {
  const { data, error } = await supabase.from("Lessons").insert(newLesson);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getLessons = async (): Promise<LessonWithClass[]> => {
  const { data, error } = await supabase
    .from("Lessons")
    .select("*,Classes(name)");

  if (error) {
    throw new Error(error.message);
  }

  return data as LessonWithClass[];
};

export const updateLesson = async (
  id: string,
  updates: Partial<LessonWithClass>,
) => {
  const { data, error } = await supabase
    .from("Lessons")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};
