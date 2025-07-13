import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { BuyerAddress } from "@/types/buyer";
import {
  fetchAllBuyerAddresses,
  createBuyerAddressApi,
} from "@/services/buyer/buyerAddress.api";
import { isTokenExpired } from "@/utils/tokenExpired";
import { z } from "zod";
import { addressSchema } from "@/schemas/AddressSchema";
import { useAuth } from "@/providers/AuthProvider";

export const useBuyerAddresses = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [addresses, setAddresses] = useState<BuyerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<BuyerAddress>();

  const handleAddAddress = async (
    newAddressData: z.infer<typeof addressSchema>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdProduct = await createBuyerAddressApi(
        newAddressData,
        user?.accessToken
      );
      setAddresses((prevProducts) => [...prevProducts, createdProduct]);
      setIsAddFormOpen(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error("Failed to create data", {
        description: errorMessage || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedAddress = (newAddressData: BuyerAddress) => {
    setSelectedAddress((prev) =>
      prev?.id === newAddressData.id ? undefined : newAddressData
    );
  };

  const handlePlaceOrder = () => {
    alert("Generate Payment Link");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchAllBuyerAddresses(user?.accessToken);
        setAddresses(response);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        toast.error("Failed to load addresses", {
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.accessToken) {
      const isExpired = isTokenExpired(user.accessToken);
      if (isExpired) {
        router.push("/auth/login/");
      } else {
        fetchAddresses();
      }
    }
  }, [user, router]);

  return {
    addresses,
    isAddFormOpen,
    isLoading,
    error,
    selectedAddress,
    setIsAddFormOpen,
    handleAddAddress,
    handlePlaceOrder,
    handleSelectedAddress,
  };
};
