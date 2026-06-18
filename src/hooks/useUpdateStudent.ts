import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "../services/studentsService";
import type { Student } from "../types/index";

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Student> }) =>
      updateStudent(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },

    onError: (error) => {
      console.error("Ops, qualcosa è andato storto:", error.message);
    },
  });
};
