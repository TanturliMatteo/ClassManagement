import { supabase } from "./supabase";
import type { Teacher } from "../types";

export const createTeacher = async (newTeacher: Omit<Teacher, "id">) => {
  const { data, error } = await supabase
    .from("Teachers")
    .insert(newTeacher);

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

export const deleteTeacher = async (id: string) => {
  // .select() restituisce le righe eliminate: se è vuoto non è stato cancellato
  // nulla (record già rimosso o permessi RLS insufficienti).
  const { data, error } = await supabase
    .from("Teachers")
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
