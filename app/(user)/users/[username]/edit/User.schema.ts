import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(), // Permet une chaîne de caractères ou null/undefined
  image: z.string().optional(),
  age: z.date(), // Permet un nombre entier ou null/undefined
  username: z.string(), // Permet une chaîne de caractères ou null/undefined
});

export type UserType = z.infer<typeof UserSchema>;