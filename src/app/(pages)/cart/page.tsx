"use client";

import { useEffect, useState } from "react";
import { ApiService } from "@/lib/services/ApiServices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartResponse } from "@/lib/interfaces/interface";
import Link from "next/link";

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null); // track which item is updating

  useEffect(() => {
    async function fetchCart() {
      if (!session?.accessToken) {
        setCart(null);
        return;
      }
      setIsLoading(true);
      try {
        const response = await ApiService.getUserCart();
        setCart(response);
      } catch (err: unknown) {
        console.error("Cart fetch error:", err);
        setError("Failed to fetch cart");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCart();
  }, [session]);

  async function handleClearCart() {
    try {
      const cleared = await ApiService.clearCart();
      // if cleared cart doesn't return products, reset to null to show empty state
      if (!cleared.data || !cleared.data.products?.length) {
        setCart(null);
      } else {
        setCart(cleared);
      }
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  }

  async function handleIncrease(productId: string, currentCount: number) {
    try {
      setLoadingItemId(productId);
      const updated = await ApiService.updateCartQuantity(
        productId,
        currentCount + 1
      );
      setCart(updated);
    } catch (err) {
      console.error("Increase error:", err);
    } finally {
      setLoadingItemId(null);
    }
  }

  async function handleDecrease(productId: string, currentCount: number) {
    try {
      if (currentCount > 1) {
        setLoadingItemId(productId);
        const updated = await ApiService.updateCartQuantity(
          productId,
          currentCount - 1
        );
        setCart(updated);
      }
    } catch (err) {
      console.error("Decrease error:", err);
    } finally {
      setLoadingItemId(null);
    }
  }

  async function handleRemove(productId: string) {
    try {
      setLoadingItemId(productId);
      const updated = await ApiService.removeCartItem(productId);
      setCart(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingItemId(null);
    }
  }

  // --- Shared full-height wrapper for loading/empty/error states ---
  const FullHeightMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">{children}</p>
    </div>
  );

  if (isLoading) {
    return <FullHeightMessage>Loading your cart...</FullHeightMessage>;
  }

  if (error) {
    return <FullHeightMessage>{error}</FullHeightMessage>;
  }

  if (!cart || !cart.data?.products?.length || cart.numOfCartItems === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-blue-800">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">
          Start adding products to your cart.
        </p>
        <Button
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
          onClick={() => (window.location.href = "/products")}
        >
          Shop Products
        </Button>
      </div>
    );
  }

  // --- Main Cart ---
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-800">
          Your Cart – {cart.numOfCartItems} items
        </h1>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 flex-1">
        {cart.data.products.map((cp) => {
          const isUpdating = loadingItemId === cp.product._id;
          return (
            <div
              key={cp._id}
              className="flex flex-col sm:flex-row gap-4 border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                <Image
                  src={cp.product.imageCover}
                  alt={cp.product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-4">
                <h2 className="text-xl font-semibold text-blue-900">
                  {cp.product.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Unit Price:{" "}
                  <span className="text-blue-700 font-medium">
                    ${cp.product.price}
                  </span>
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="icon"
                    onClick={() => handleDecrease(cp.product._id, cp.count)}
                    disabled={isUpdating || cp.count <= 1}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 cursor-pointer"
                  >
                    −
                  </Button>
                  <span className="px-3 font-medium">{cp.count}</span>
                  <Button
                    size="icon"
                    onClick={() => handleIncrease(cp.product._id, cp.count)}
                    disabled={isUpdating}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 cursor-pointer"
                  >
                    +
                  </Button>
                </div>

                {/* Subtotal + Remove */}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-lg font-bold text-orange-600">
                    Price: ${cp.price}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isUpdating}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 cursor-pointer"
                    onClick={() => handleRemove(cp.product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total and Checkout */}
      <div className="mt-10 flex flex-col sm:flex-row justify-end items-end gap-6">
        <div className="text-right">
          <p className="text-lg text-gray-600">Subtotal:</p>
          <p className="text-3xl font-bold text-blue-800">
            ${cart.data.totalCartPrice}
          </p>
        </div>
        <Link href={"/checkout"}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-md">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
