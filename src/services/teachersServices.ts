import { supabase } from "./supabase";
import type { Teacher } from "../types";

export const createTeacher = async (newTeacher: Omit<Teacher, "id">) => {
  const { data, error } = await supabase
    .from("Teachers")
    .insert(newTeacher as Teacher);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getTeachers = async (): Promise<Teacher[]> => {
  const { data, error } = await supabase
    .from("Teachers")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Teacher[];
};

export const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
  const { data, error } = await supabase
    .from("Teachers")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};
