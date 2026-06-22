import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../services/classesServices";

export const useGetClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,

    meta: {
      errorMessage: "Impossibile caricare la lista delle classi",
    },
  });
};
