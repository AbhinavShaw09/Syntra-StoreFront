"use client";

import { useBuyerAddresses } from "@/hooks/useBuyerAddresses";
import LoaderState from "@/components/common/LoaderState";
import NotFound from "@/app/not-found";
import BuyerAddresses from "./BuyerAddresses";
import { AddAddressForm } from "@/components/account/AddAddressForm";
import { BuyerAddress } from "@/types/buyer";

type Props = {
  onAddressSelect?: (address: BuyerAddress) => void;
};

const BuyerAddressManager = ({ onAddressSelect }: Props) => {
  const {
    addresses,
    isAddFormOpen,
    isLoading,
    error,
    selectedAddress,
    setIsAddFormOpen,
    handleAddAddress,
    handleSelectedAddress,
  } = useBuyerAddresses();

  if (isLoading) return <LoaderState />;
  if (error) return <NotFound />;

  return (
    <>
      <BuyerAddresses
        addresses={addresses}
        selectedAddress={selectedAddress}
        handleSelectedAddress={(addr) => {
          handleSelectedAddress(addr);
          onAddressSelect?.(addr);
        }}
        setIsAddFormOpen={setIsAddFormOpen}
      />
      <AddAddressForm
        isOpen={isAddFormOpen}
        onOpenChange={setIsAddFormOpen}
        onAddAddress={handleAddAddress}
      />
    </>
  );
};

export default BuyerAddressManager;
