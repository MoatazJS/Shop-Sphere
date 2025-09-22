"use client";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/lib/services/ApiServices";
import { ShoppingCart } from "lucide-react";
import { AddtoCartProps } from "@/lib/interfaces/interface";
import { useSession } from "next-auth/react";
export default function AddToCartBtn({ productId }: AddtoCartProps) {
  const { data: session } = useSession();

  async function handleAddToCart() {
    try {
      if (!session?.accessToken) {
        console.error("No token found, user not logged in");
        return;
      }
      const res = await ApiService.addToCart(productId);
      console.log("Added to cart:", res);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <Button
        onClick={handleAddToCart}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
      >
        <ShoppingCart /> Add to Cart
      </Button>
    </>
  );
}
