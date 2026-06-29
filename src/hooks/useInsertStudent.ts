import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../services/studentsService";
import type { Student } from "../types/index";

export const useInsertStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStudent: Omit<Student, "id" | "created_at">) =>
      createStudent(newStudent as Student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
