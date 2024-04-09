import { z } from "zod";

export const ActivitySchema = z.object({
  Title: z.string(),
  slug: z.string().regex(/^[a-zA-Z0-9_-]*$/).min(5).max(20),
  categorie: z.string(),
  Information: z.string(),
  Date: z.date(),
  Hour: z.string(),
  Location: z.string(),
  Free: z.boolean(),
  Link: z.string().optional(),
  userWanted: z.string(),
  Icon: z.string(),


});

export type ActivityType = z.infer<typeof ActivitySchema>

export const activityCategories = [
  "Art and Craft",
  "Barbecue",
  "Beach Party",
  "Board Games",
  "Book Club",
  "Camping",
  "Community Work",
  "Cooking",
  "Dance Workshop",
  "Escape Room",
  "Fishing Trip",
  "Fitness Class",
  "Game Night",
  "Hiking and Trekking",
  "Karaoke Night",
  "Live Music",
  "Movie Night",
  "Museum Tour",
  "Outdoor Sports",
  "Picnic",
  "Stand-Up Comedy",
  "Theater Show",
  "Wine Tasting",
  "Yoga Session",
  "Zoo Visit",
]

export const icons = [
  "Beef",
  "Beer",
  "Bike",
  "Castle",
  "Clapperboard",
  "Dumbbell",
  "Drill",
  "Fish",
  "Footprints",
  "Gamepad2",
  "MountainSnow",
  "Music",
  "Palette",
  "PartyPopper",
  "Puzzle",
  "UtensilsCrossed",
  "Wine",
  "TreePine",
  "Theater",
]