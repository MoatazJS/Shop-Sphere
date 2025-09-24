"use client";

import { useEffect, useState } from "react";
import { ApiService } from "@/lib/services/ApiServices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WishlistResponse, WishlistProduct } from "@/lib/interfaces/interface";

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  // Fetch wishlist on mount
  useEffect(() => {
    async function fetchWishlist() {
      if (!session?.accessToken) {
        setWishlist([]);
        return;
      }
      setIsLoading(true);
      try {
        const response: WishlistResponse = await ApiService.getUserWishlist();
        setWishlist(response.data);
      } catch (err) {
        alert("Wishlist fetch error:" + { err });
        setError("Failed to fetch wishlist");
      } finally {
        setIsLoading(false);
      }
    }
    fetchWishlist();
  }, [session]);

  async function handleRemove(productId: string) {
    try {
      setLoadingItemId(productId);
      await ApiService.removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Remove wishlist error:", err);
    } finally {
      setLoadingItemId(null);
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      setLoadingItemId(productId);
      await ApiService.addToCart(productId);
      // Optional: toast notification "Added to Cart"
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setLoadingItemId(null);
    }
  }

  const FullHeightMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">{children}</p>
    </div>
  );

  if (isLoading)
    return <FullHeightMessage>Loading your wishlist...</FullHeightMessage>;
  if (error) return <FullHeightMessage>{error}</FullHeightMessage>;
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-blue-800">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-gray-500">
          Start saving your favorite products.
        </p>
        <Button
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
          onClick={() => (window.location.href = "/products")}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Your Wishlist – {wishlist.length} items
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {wishlist.map((product) => {
          const isUpdating = loadingItemId === product._id;
          return (
            <div
              key={product._id}
              className="flex flex-col border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative w-full h-56 bg-gray-50">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-4">
                <h2 className="text-lg font-semibold text-blue-900">
                  {product.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Brand: {product.brand.name}
                </p>
                <p className="text-orange-600 font-bold text-lg mt-2">
                  ${product.price}
                </p>

                {/* Actions */}
                <div className="mt-auto flex gap-3 pt-3">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-1 disabled:opacity-50 cursor-pointer"
                    disabled={isUpdating}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white flex-1 disabled:opacity-50 cursor-pointer"
                    disabled={isUpdating}
                    onClick={() => handleRemove(product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
