import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../services/teachersServices";
import type { Teacher } from "../types/index";

export const useInsertStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTeacher: Omit<Teacher, "id">) =>
      createTeacher(newTeacher as Teacher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
