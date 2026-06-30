import { supabase } from "./supabase";
import type { StudentWithClass, Student } from "../types";

export const createStudent = async (newStudent: Omit<Student, "id">) => {
  const { data, error } = await supabase
    .from("Students")
    .insert(newStudent as Student);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getStudents = async (): Promise<StudentWithClass[]> => {
  const { data, error } = await supabase
    .from("Students")
    .select("*,Classes(name)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data as StudentWithClass[];
};

export const updateStudent = async (
  id: string,
  updates: Partial<StudentWithClass>,
) => {
  const { data, error } = await supabase
    .from("Students")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data, error } = await supabase.from("Students").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
