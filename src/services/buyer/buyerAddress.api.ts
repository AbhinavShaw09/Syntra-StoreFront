import { apiFetch } from "@/lib/api";
import { BuyerAddress } from "@/types/buyer";
import { BakckendEndpoints } from "@/utils/endpoints";

export const fetchAllBuyerAddresses = async (
  token?: string
): Promise<BuyerAddress[]> => {
  return await apiFetch<BuyerAddress[]>(
    BakckendEndpoints.BUYER.GET_BUYER_ADDRESS,
    {
      token,
    }
  );
};

export const createBuyerAddressApi = async (
  newAddressData: Partial<BuyerAddress>,
  token?: string
): Promise<BuyerAddress> => {
  return await apiFetch<BuyerAddress>(
    BakckendEndpoints.ADDRESS.CREATE_BUYER_ADDRESS,
    {
      method: "POST",
      body: newAddressData,
      token,
    }
  );
};
