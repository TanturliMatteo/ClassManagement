import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, type NewStudent } from "../services/studentsService";

export const useInsertStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStudent: NewStudent) => createStudent(newStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
