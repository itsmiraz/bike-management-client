import * as z from "zod";
const createStringSchema = (fieldName: string) =>
  z.string({
    invalid_type_error: `${fieldName} must be a string`,
    required_error: `${fieldName} is required`,
  });

export const loginShcema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const addNewBikeSchema = z.object({
  name: createStringSchema("Name").min(2).max(50),
  price: z.number().min(2),
  quantity: z.number().min(2),
  brand: createStringSchema("Brand").min(2).max(50),
  model: createStringSchema("Model").min(2).max(50),
  type: createStringSchema("Type").min(2).max(50),
  size: z.number().min(2).max(2000),
  color: createStringSchema("Color").min(2).max(50),
  releaseDate: createStringSchema("Realease Date").min(2).max(50),
});

export const SaleSchema = z.object({
  buyerName: z.string().min(2).max(50),
  date: z.date({
    required_error: "A date is required.",
  }),
  quantity: z.number().min(1),
});
