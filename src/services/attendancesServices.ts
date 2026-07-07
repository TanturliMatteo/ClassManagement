import { supabase } from "./supabase";
import type { Attendances } from "../types";

export const getAttendances = async (): Promise<Attendances[]> => {
  const { data, error } = await supabase.from("Attendances").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Attendances[];
};

export const createAttendance = async (newAttendance: Attendances) => {
  const { data, error } = await supabase
    .from("Attendances")
    .insert(newAttendance as Attendances);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getAttendancesByLesson = async (
  lessonId: string,
): Promise<Attendances[]> => {
  const { data, error } = await supabase
    .from("Attendances")
    .select("*")
    .eq("lesson_id", lessonId);

  if (error) {
    throw new Error(error.message);
  }
  return data as Attendances[];
};

export const updateAttendance = async (
  attendance: Partial<Attendances> | Partial<Attendances>[],
) => {
  const { data, error } = await supabase
    .from("Attendances")
    .upsert(attendance, { onConflict: "lesson_id,student_id" });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
