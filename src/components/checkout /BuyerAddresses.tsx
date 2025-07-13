import React from "react";
import { BuyerAddress } from "@/types/buyer";

interface BuyerAddressProps {
  addresses: BuyerAddress[];
  selectedAddress: BuyerAddress | undefined;
  handleSelectedAddress: (address: BuyerAddress) => void;
  setIsAddFormOpen: (isOpen: boolean) => void;
}

const BuyerAddresses = ({
  addresses,
  selectedAddress,
  handleSelectedAddress,
  setIsAddFormOpen,
}: BuyerAddressProps) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl flex flex-col items-center justify-center gap-2">
        <div className="bg-gray-100 w-full flex items-center justify-center py-8">
          {addresses.length >= 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-center">
                Saved Addresses
              </h2>
              <ul className="space-y-2">
                {!selectedAddress && (
                  <div className="text-center text-red-600 font-bold  ">
                    {`${
                      addresses.length > 0
                        ? "Select a address before placing order"
                        : "Add a address first before placing order"
                    }`}
                  </div>
                )}
                {(addresses.length > 0 || true) && (
                  <div className="mt-6 w-full">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 m-5">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`border p-4 rounded-md shadow-sm cursor-pointer ${
                            selectedAddress?.id === address.id
                              ? "bg-gray-200"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            handleSelectedAddress(address);
                          }}
                        >
                          <div className="font-semibold">
                            {address.first_name} {address.middle_name}{" "}
                            {address.last_name}
                          </div>
                          <div>{address.address_line1}</div>
                          {address.address_line2 && (
                            <div>{address.address_line2}</div>
                          )}
                          <div>
                            {address.city}, {address.country}
                          </div>
                          <div>{address.phone_number}</div>
                        </div>
                      ))}
                      <div
                        className="border p-4 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => setIsAddFormOpen(true)}
                      >
                        Add Address ➕
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerAddresses;
