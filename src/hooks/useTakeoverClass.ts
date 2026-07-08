import { useMutation, useQueryClient } from "@tanstack/react-query";
import { takeoverClass } from "../services/takeOverServices";

export const useTakeoverClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: takeoverClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });

      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
