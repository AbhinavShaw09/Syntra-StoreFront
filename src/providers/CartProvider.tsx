"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
// import { apiFetch } from "@/lib/api";
// import { BakckendEndpoints } from "@/lib/endpoints";

type CartItem = {
  id: number;
  name: string;
  selling_price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  totalQuantity: number;
  totalPrice: string;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  updateItemQuantity: (id: number, newQuantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shopping-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const totalItems = useMemo(() => cart.length, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return Number(
      cart.reduce((total, item) => total + item.selling_price * item.quantity, 0)
    ).toFixed(2);
  }, [cart]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setCart((prev) => {
        const existingItem = prev.find((i) => i.id === item.id);
        const quantityToAdd = item.quantity ?? 1;

        if (existingItem) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantityToAdd }
              : i
          );
        }
        return [...prev, { ...item, quantity: quantityToAdd }];
      });
    },
    []
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const increaseItemQuantity = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseItemQuantity = useCallback((id: number) => {
    setCart((prev) => {
      const itemToUpdate = prev.find((item) => item.id === id);
      if (itemToUpdate) {
        if (itemToUpdate.quantity > 1) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prev.filter((item) => item.id !== id);
        }
      }
      return prev;
    });
  }, []);

  const updateItemQuantity = useCallback((id: number, newQuantity: number) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      totalItems,
      totalQuantity,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      updateItemQuantity,
    }),
    [
      cart,
      totalItems,
      totalQuantity,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      updateItemQuantity,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
