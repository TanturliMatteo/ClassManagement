import { supabase } from "../services/supbase";
import type { StudentWithClass } from "../types";

export const getStudents = async (): Promise<StudentWithClass[]> => {
  const { data, error } = await supabase.from("Students").select(`
      *,
      Classes (
        name
      )
    `);

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
