import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance } from "../services/attendancesServices";
import type { Attendances } from "../types";

export const useInsertAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAttendance: Attendances) => createAttendance(newAttendance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
