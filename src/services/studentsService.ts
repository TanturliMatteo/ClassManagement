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
