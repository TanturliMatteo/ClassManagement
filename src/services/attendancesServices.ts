import { supabase } from "./supabase";
import type { Attendances } from "../types";

export const getAttendances = async (): Promise<Attendances[]> => {
  const { data, error } = await supabase.from("Attendances").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Attendances[];
};

export const createAttendance = async (newAttendance: Attendances) => {
  const { data, error } = await supabase
    .from("Attendances")
    .insert(newAttendance as Attendances);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
