import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacher } from "../services/teachersServices";
import type { Teacher } from "../types/index";

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Teacher> }) =>
      updateTeacher(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },

    onError: (error) => {
      console.error("Ops, qualcosa è andato storto:", error.message);
    },
  });
};
