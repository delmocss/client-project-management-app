import api from "../../services/api";
import type { Client } from "../../types/client";

export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get<Client[]>("/clients");
  return data;
};

export const createClient = async (
  client: Omit<Client, "id" | "createdAt">
): Promise<Client> => {
  const { data } = await api.post<Client>("/clients", {
    ...client,
    createdAt: new Date().toISOString(),
  });
  return data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await api.delete(`/clients/${id}`);
};

export const updateClient = async (
  id: number,
  client: Partial<Omit<Client, "id" | "createdAt">>
): Promise<Client> => {
  const { data } = await api.patch<Client>(`/clients/${id}`, client);
  return data;
};