"use client";

import React from "react";

import { useCart } from "@/providers/CartProvider";
import { useBuyerAddresses } from "@/hooks/useBuyerAddresses";

import LoaderState from "@/components/common/LoaderState";
import CartCheckout from "@/components/checkout /CartCheckout";
import BuyerAddresses from "@/components/checkout /BuyerAddresses";
import { AddAddressForm } from "@/components/account/AddAddressForm";

import NotFound from "../not-found";

const Checkout = () => {
  const {
    cart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    totalQuantity,
    totalPrice,
  } = useCart();

  const {
    addresses,
    isAddFormOpen,
    isLoading,
    error,
    selectedAddress,
    setIsAddFormOpen,
    handleAddAddress,
    handleSelectedAddress,
    handlePlaceOrder,
  } = useBuyerAddresses();

  if (isLoading) return <LoaderState />;
  if (error) return <NotFound />;

  return (
    <section className="lg:grid lg:gap-8 lg:grid-cols-2 m-5">
      <CartCheckout
        cart={cart}
        increaseItemQuantity={increaseItemQuantity}
        decreaseItemQuantity={decreaseItemQuantity}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        handlePlaceOrder={handlePlaceOrder}
        removeFromCart={removeFromCart}
      />
      <BuyerAddresses
        addresses={addresses}
        selectedAddress={selectedAddress}
        handleSelectedAddress={handleSelectedAddress}
        setIsAddFormOpen={setIsAddFormOpen}
      />
      <AddAddressForm
        isOpen={isAddFormOpen}
        onOpenChange={setIsAddFormOpen}
        onAddAddress={handleAddAddress}
      />
    </section>
  );
};
export default Checkout;
