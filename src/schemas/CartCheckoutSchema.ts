import { z } from "zod";

export const cartItemSchema = z.object({
  product_id: z.number(),
  name: z.string().min(1, { message: "Product name is required." }),
  selling_price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Selling price must be a valid decimal number.",
  }),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1." }),
});

export const cartSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;
export type CartCheckoutValues = z.infer<typeof cartSchema>;
