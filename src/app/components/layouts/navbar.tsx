"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // User dropdown
  const { data: session } = useSession();

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-gray-900 shadow-md relative">
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
        <div className="flex items-center gap-4 relative">
          {/* Desktop Login/Signup */}
          {!session && (
            <>
              <Link
                href="/auth/login"
                className="hover:text-orange-500 hidden md:inline"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hover:text-orange-500 hidden md:inline"
              >
                Signup
              </Link>
            </>
          )}

          {/* User dropdown */}
          {session && (
            <div ref={userMenuRef} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-orange-500 cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User />
              </Button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-orange-500  border-b">
                    Welcome, {session.user.name}
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          <Link href={"/wishlist"}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-orange-500 cursor-pointer"
            >
              <Star />
            </Button>
          </Link>

          {/* Cart */}
          <div className="relative">
            <Link href={"/cart"}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                <ShoppingCart />
              </Button>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full px-1">
                2
              </span>
            </Link>
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

          {!session && (
            <>
              <Link href="/auth/login" className="block hover:text-orange-500">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block hover:text-orange-500"
              >
                Signup
              </Link>
            </>
          )}

          {/* User menu on mobile */}
          {session && (
            <div className="border-t border-gray-700 pt-2">
              <div className="px-2 py-1 text-orange-400">
                Welcome, {session.user.name}
              </div>
              <Link
                href="/auth/forgot-password"
                className="block px-2 py-1 hover:text-orange-300"
              >
                Forgot Password?
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
