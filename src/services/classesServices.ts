import { supabase } from "./supabase";
import type { ClassWithTeacher, Class } from "../types";

export const getClasses = async (): Promise<ClassWithTeacher[]> => {
  const { data, error } = await supabase
    .from("Classes")
    .select("*,Teachers(name)")
    .order("end_date  ", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as ClassWithTeacher[];
};

export const createClass = async (
  newClass: Omit<Class, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("Classes")
    .insert(newClass);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateClass = async (
  id: string,
  updates: Partial<Class>,
) => {
  const { data, error } = await supabase
    .from("Classes")
    .update(updates)
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteClass = async (id: string) => {
  // .select() restituisce le righe eliminate: se è vuoto non è stato cancellato
  // nulla (record già rimosso o permessi RLS insufficienti).
  const { data, error } = await supabase
    .from("Classes")
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
