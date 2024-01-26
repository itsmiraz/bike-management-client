import * as z from "zod";

export const loginShcema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
