import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "../services/attendancesServices";

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAttendance,
    onSuccess: (_, variables) => {
      const lessonId = Array.isArray(variables)
        ? variables[0]?.lesson_id
        : variables.lesson_id;

      if (lessonId) {
        queryClient.invalidateQueries({
          queryKey: ["attendances", lessonId],
        });
      }

      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};
