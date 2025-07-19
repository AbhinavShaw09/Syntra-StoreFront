import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCheckoutSessionApi } from "@/services/cart/checkout.api";
import { CartItem } from "@/schemas/CartCheckoutSchema";
import { useAuth } from "@/providers/AuthProvider";

interface UseCheckoutReturn {
  isLoading: boolean;
  error: string | null;
  handleCheckout: (cart: CartItem[]) => Promise<void>;
}

export const useCheckout = (): UseCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useAuth();

  const handleCheckout = async (cart: CartItem[]) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.accessToken) {
        router.push("/auth/login");
        return;
      }

      if (cart.length === 0) {
        throw new Error("Your cart is empty.");
      }

      await createCheckoutSessionApi(
        cart.map((item) => ({
          ...item,
          selling_price: String(item.selling_price),
        })),
        user.accessToken
      );

      router.push("/checkout");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error("Failed to checkout", {
        description: errorMessage || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleCheckout,
  };
};
