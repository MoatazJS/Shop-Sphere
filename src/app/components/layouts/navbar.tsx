"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { ApiService } from "@/lib/services/ApiServices";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setCartItems } from "@/redux/slices/cartSlice";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // User dropdown
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userMenuRef = useRef<HTMLDivElement>(null);
  console.log(session?.accessToken);
  useEffect(() => {
    let mounted = true;

    const fetchCart = async () => {
      if (session) {
        try {
          const cart = await ApiService.getUserCart();
          if (mounted) {
            dispatch(setCartItems(cart.numOfCartItems ?? 0));
          }
        } catch (err) {
          console.error("Failed to fetch cart:", err);
          if (mounted) dispatch(setCartItems(0));
        }
      } else {
        if (mounted) dispatch(setCartItems(0));
      }
    };

    fetchCart();

    return () => {
      mounted = false;
    };
  }, [session, dispatch]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
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
                  <Link
                    href="/add-address"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Your Addresses
                  </Link>
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign Out
                  </button>
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
              {mounted && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full px-1">
                  {cartItems}
                </span>
              )}
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
          {session && (
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="block w-full text-left hover:text-orange-400 cursor-pointer"
            >
              Sign Out
            </button>
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
