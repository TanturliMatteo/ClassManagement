import { supabase } from "../services/supabase";

export const takeoverClass = async (payload: {
  id_vecchia_classe: string;
  id_nuovo_prof: string;
  nuovo_inizio: string;
  nuovo_fine: string;
}) => {
  const { data, error } = await supabase.rpc("takeover_class_atomic", payload);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
