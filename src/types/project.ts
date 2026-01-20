export type ProjectStatus = "pending" | "active" | "completed";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  clientId: number;
  createdAt: string;
}
