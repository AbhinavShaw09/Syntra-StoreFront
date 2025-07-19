"use client";

import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartCheckout from "@/components/checkout/CartCheckout";
import BuyerAddressManager from "@/components/checkout/BuyerAddressManager";
import { useHasMounted } from "@/hooks/hasMounted";

const Checkout = () => {
  const hasMounted = useHasMounted();
  const {
    cart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    totalQuantity,
    totalPrice,
  } = useCart();

  if (!hasMounted) return null;

  const handlePlaceOrder = () => {
    alert("Generate Payment Link");
  };

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
      <BuyerAddressManager />
    </section>
  );
};
export default Checkout;
