import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  age: z.date(),
  username: z.string(), 
});

export type UserType = z.infer<typeof UserSchema>;