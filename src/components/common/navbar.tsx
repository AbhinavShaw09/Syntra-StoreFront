"use client";

import Link from "next/link";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "Categories", href: "/categories" },
	{ label: "Products", href: "/products" },
];

export default function Navbar() {
	return (
		<header className="w-full bg-white sticky top-0 z-50 border-b border-violet-200/70 shadow-[0_2px_8px_0_rgba(124,58,237,0.06)]">
			<nav className="flex items-center justify-between px-4 md:px-8 h-16">
				{/* Brand Logo */}
				<Link
					href="/"
					className="text-2xl font-extrabold text-indigo-600"
				>
					Syntra
				</Link>

				{/* Desktop Links */}
				<ul className="hidden md:flex gap-6 items-center">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="text-sm font-semibold hover:text-indigo-600 transition "
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				<div>
					<Link href="/account" className="hidden md:inline-block">
						<Button variant="ghost">
							<User className="h-10 w-10" />
						</Button>
					</Link>
					<Link href="/cart" className="hidden md:inline-block">
						<Button variant="ghost">
							<ShoppingCart className="h-10 w-10" />
						</Button>
					</Link>
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
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
