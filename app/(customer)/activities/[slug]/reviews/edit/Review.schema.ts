import { z } from "zod";

export const ReviewSchema = z.object({
  Title: z.string(),
  content: z.string(),
  rating: z.string(),
  ip: z.string().optional().nullable(), 
  activityId: z.string(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

