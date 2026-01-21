import api from "../../services/api";
import type { Project } from "../../types/project";
import { mockProjects } from "../../mocks/projects";

export const getProjects = async (): Promise<Project[]> => {
  if (import.meta.env.PROD) {
    return mockProjects as Project[];
  }
  const { data } = await api.get<Project[]>("/projects");
  return data;
};

export const createProject = async (
  project: Omit<Project, "id" | "createdAt"> & { createdAt?: string }
): Promise<Project> => {
  const { data } = await api.post<Project>("/projects", project);
  return data;
};

export const updateProject = async (
  id: number,
  project: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project> => {
  const { data } = await api.patch<Project>(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
