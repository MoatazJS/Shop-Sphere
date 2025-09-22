"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white text-gray-900 shadow-md ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="bg-orange-500 text-white rounded-full px-2 py-1 font-extrabold">
            S
          </span>
          ShopSphere
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link href="/products" className="hover:text-orange-500">
            Products
          </Link>
          <Link href="/brands" className="hover:text-orange-500">
            Brands
          </Link>
          <Link href="/categories" className="hover:text-orange-500">
            Categories
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {!session && (
            <Link
              href="/auth/login"
              className="hover:text-orange-500 hidden md:inline"
            >
              Login
            </Link>
          )}
          {!session && (
            <Link
              href="/auth/register"
              className="hover:text-orange-500 hidden md:inline"
            >
              Signup
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-orange-500"
          >
            <User />
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-orange-500"
            >
              <ShoppingCart />
            </Button>
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full px-1">
              2
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 text-white px-4 py-3 space-y-3 absolute w-full">
          <Link href="/products" className="block hover:text-orange-400">
            Products
          </Link>
          <Link href="/brands" className="block hover:text-orange-400">
            Brands
          </Link>
          <Link href="/categories" className="block hover:text-orange-400">
            Categories
          </Link>
          <Link href="/auth/login" className="block hover:text-orange-500">
            Login
          </Link>
          <Link href="/auth/register" className="block hover:text-orange-500">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
