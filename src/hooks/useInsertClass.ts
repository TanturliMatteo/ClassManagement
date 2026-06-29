import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClass } from "../services/classesServices";
import type { Class } from "../types";

export const useInsertClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newClass: Omit<Class, "id" | "created_at">) =>
      createClass(newClass as Class),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
