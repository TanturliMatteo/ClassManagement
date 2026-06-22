import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClass } from "../services/classesServices";
import type { Class } from "../types/index";

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Class> }) =>
      updateClass(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error) => {
      console.error("Ops, qualcosa è andato storto:", error.message);
    },
  });
};
