import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  status: z.enum(["pending", "active", "completed"]),
  clientId: z.number().min(1, "Client is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
