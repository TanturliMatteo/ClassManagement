import { useMutation, useQueryClient } from "@tanstack/react-query";
import { takeoverClass } from "../services/takeOverServices"; // Sistema il percorso in base al tuo progetto

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
