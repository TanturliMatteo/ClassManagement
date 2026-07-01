import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../services/studentsService";

export const useGetStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,

    meta: {
      errorMessage: "Impossibile caricare la lista degli studenti",
    },
  });
};
