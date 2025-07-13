import { z } from "zod";

export const addressSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middle_name: z.string().optional().or(z.literal("").optional()),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  phone_number: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(20, { message: "Phone number can't exceed 20 digits." })
    .optional()
    .or(z.literal("").optional()),
  address_line1: z
    .string()
    .min(5, { message: "Address Line 1 must be at least 5 characters." }),
  address_line2: z.string().optional().or(z.literal("").optional()),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  is_default: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
