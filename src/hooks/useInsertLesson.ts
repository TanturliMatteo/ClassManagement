import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLesson } from "../services/lessonsServices";
import type { Lesson } from "../types";

export const useInsertLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLesson: Omit<Lesson, "id" | "created_at">) =>
      createLesson(newLesson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};
