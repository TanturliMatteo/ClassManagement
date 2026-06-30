import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTeacher } from "../services/teachersServices";

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
