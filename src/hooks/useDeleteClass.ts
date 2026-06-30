import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteClass } from "../services/classesServices";

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
