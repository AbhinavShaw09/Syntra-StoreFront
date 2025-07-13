"use client";

import Link from "next/link";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Account", href: "/account" }, // for mobile only
];

export default function Navbar() {
  const { totalQuantity } = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-violet-300/70 shadow-[0_2px_8px_0_rgba(124,58,237,0.06)]">
      <nav className="flex items-center justify-between px-4 md:px-8 h-16">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600">
          Syntra
        </Link>
        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map(
            (item) =>
              item.label !== "Account" && (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold hover:text-indigo-600 transition "
                  >
                    {item.label}
                  </Link>
                </li>
              )
          )}
        </ul>

        <div>
          <Link href="/account" className="hidden md:inline-block">
            <Button variant="ghost" className="rounded-full">
              <User className="h-10 w-10" />
            </Button>
          </Link>
          <Link href="/cart" className="hidden md:inline-block">
            <Button
              variant="ghost"
              className="rounded-full flex items-center justify-center"
            >
              <div className="relative">
                <ShoppingCart className="h-10 w-10" />
                {hasMounted && totalQuantity > 0 && (
                  <span className="absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Link href="/cart" className="inline-block">
            <Button
              variant="ghost"
              className="rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="h-10 w-10" />
              {hasMounted && totalQuantity > 0 && (
                <span className="relative -top-2 right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8 ml-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-semibold hover:text-indigo-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
