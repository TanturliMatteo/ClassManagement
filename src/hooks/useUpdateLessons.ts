import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLesson } from "../services/lessonsServices";
import type { Lesson } from "../types/index";

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Lesson> }) =>
      updateLesson(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      console.error("Ops, qualcosa è andato storto:", error.message);
    },
  });
};
