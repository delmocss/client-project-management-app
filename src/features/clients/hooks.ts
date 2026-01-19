import { useQuery } from "@tanstack/react-query";
import { getClients } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "./api";
import type { Client } from "../../types/client";
import type { ClientFormValues } from "./schema";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientFormValues) =>
      createClient({
        ...data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};


export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
};


