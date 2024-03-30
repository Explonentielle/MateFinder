import { z } from "zod";

export const CandidacySchema = z.object({
  status: z.string(),
  userId: z.string(),
  activityId: z.string(),
});

export type CandidacyType = z.infer<typeof CandidacySchema>;