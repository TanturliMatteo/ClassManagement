import { supabase } from "./supabase";
import type { ClassWithTeacher } from "../types";

export const createClass = async (newClass: ClassWithTeacher) => {
  const { data, error } = await supabase.from("Classes").insert(newClass);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getClasses = async (): Promise<ClassWithTeacher[]> => {
  const { data, error } = await supabase
    .from("Classes")
    .select("*, teacher(name)")
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
