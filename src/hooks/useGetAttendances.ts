import { useQuery } from "@tanstack/react-query";
import { getAttendances } from "../services/attendancesServices";

export const useGetAttendances = () => {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: getAttendances,
    meta: {
      errorMessage: "Impossibile caricare la lista delle presenze",
    },
  });
};
