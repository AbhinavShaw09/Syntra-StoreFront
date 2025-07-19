import { apiFetch } from "@/lib/api";
import { BakckendEndpoints } from "@/utils/endpoints";
import { CartCheckoutValues } from "@/schemas/CartCheckoutSchema";
import { CheckoutSession } from "@/types/cart";

export const createCheckoutSessionApi = async (
  cartItems: CartCheckoutValues,
  token?: string
): Promise<CheckoutSession> => {
  return await apiFetch<CheckoutSession>(BakckendEndpoints.CART.ADD_TO_CART, {
    method: "POST",
    body: cartItems,
    token,
  });
};
