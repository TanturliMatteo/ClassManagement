import { supabase } from "./supabase";
import type { TeacherWithClass, Teacher } from "../types";

export const createTeacher = async (newTeacher: Omit<Teacher, "id">) => {
  const { data, error } = await supabase
    .from("Teachers")
    .insert(newTeacher as Teacher);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getTeachers = async (): Promise<TeacherWithClass[]> => {
  const { data, error } = await supabase
    .from("Teachers")
    .select("*,Classes(name)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as TeacherWithClass[];
};

export const updateTeacher = async (
  id: string,
  updates: Partial<TeacherWithClass>,
) => {
  const { data, error } = await supabase
    .from("Teachers")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};
