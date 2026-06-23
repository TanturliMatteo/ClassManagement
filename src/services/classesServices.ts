import { supabase } from "./supabase";
import type { Class } from "../types";

export const getClasses = async (): Promise<Class[]> => {
  const { data, error } = await supabase.from("Classes").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Class[];
};

export const updateClass = async (id: string, updates: Partial<Class>) => {
  const { data, error } = await supabase
    .from("Classes")
    .update(updates)
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
