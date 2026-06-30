import { supabase } from "./supabase";
import type { ClassWithTeacher, Class } from "../types";

export const createClass = async (
  newClass: Omit<Class, "id" | "created_at">,
) => {
  const { data, error } = await supabase
    .from("Classes")
    .insert(newClass as Class);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getClasses = async (): Promise<ClassWithTeacher[]> => {
  const { data, error } = await supabase
    .from("Classes")
    .select("*,Teachers(name)")
    .order("level", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data as ClassWithTeacher[];
};

export const updateClass = async (
  id: string,
  updates: Partial<ClassWithTeacher>,
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
  const { data, error } = await supabase.from("Classes").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
