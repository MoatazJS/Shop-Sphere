"use client";

import { useState } from "react";
import { ApiService } from "@/lib/services/ApiServices";
import { Star } from "lucide-react"; // star icon

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggleWishlist() {
    if (loading) return;
    setLoading(true);

    try {
      if (isWishlisted) {
        await ApiService.removeFromWishlist(productId);
        setIsWishlisted(false);
      } else {
        await ApiService.addToWishlist(productId);
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist();
      }}
      disabled={loading}
      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer"
    >
      <Star
        className={`w-6 h-6 transition ${
          isWishlisted ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
    </button>
  );
}
