import { useQuery } from "@tanstack/react-query";
import {
  getDeleteImpact,
  type DeleteEntity,
} from "../services/deleteImpactServices";

export const useDeleteImpact = (entity: DeleteEntity, id: string) => {
  return useQuery({
    queryKey: ["deleteImpact", entity, id],
    queryFn: () => getDeleteImpact(entity, id),
    enabled: !!id,
    // Sempre dati freschi: il controllo deve riflettere lo stato attuale del DB.
    staleTime: 0,
    gcTime: 0,
  });
};
