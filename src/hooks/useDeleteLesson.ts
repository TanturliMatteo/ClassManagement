import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteLesson } from "../services/lessonsServices";

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};
