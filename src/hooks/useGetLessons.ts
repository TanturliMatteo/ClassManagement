import { useQuery } from "@tanstack/react-query";
import { getLessons } from "../services/lessonsServices";

export const useGetLessons = () => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: getLessons,

    meta: {
      errorMessage: "Impossibile caricare la lista delle lezioni",
    },
  });
};
