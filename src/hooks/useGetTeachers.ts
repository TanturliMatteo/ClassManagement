import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../services/teachersServices";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,

    meta: {
      errorMessage: "Impossibile caricare la lista dei docenti",
    },
  });
};
