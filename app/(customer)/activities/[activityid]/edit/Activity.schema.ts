import { z } from "zod";

export const ActivitySchema = z.object({
  Title: z.string(),
  slug: z.string().regex(/^[a-zA-Z0-9_-]*$/).min(5).max(20),
  categorie: z.string().optional().nullable(),
  Information: z.string().optional().nullable(),
  Date: z.date().optional().nullable(),
  userWanted: z.string().optional().nullable(),
  Icon: z.string().optional().nullable(),

});

export type ActivityType = z.infer<typeof ActivitySchema>

export const activityCategories = [
    "sport", "indor", "outdor", "cultur", "musical"
]