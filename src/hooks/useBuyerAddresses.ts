import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  fetchAllBuyerAddresses,
  createBuyerAddressApi,
} from "@/services/buyer/buyerAddress.api";

import { addressSchema } from "@/schemas/AddressSchema";
import { useAuth } from "@/providers/AuthProvider";
import { BuyerAddress } from "@/types/buyer";

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

  useEffect(() => {
    if (!loading && !user) {
      router.push("auth/login");
    }
  }, [loading, user, router]);

  const fetchAddresses = useCallback(async () => {
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
  }, [user?.accessToken]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return {
    addresses,
    isAddFormOpen,
    isLoading,
    error,
    selectedAddress,
    setIsAddFormOpen,
    handleAddAddress,
    handleSelectedAddress,
  };
};
