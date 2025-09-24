"use client";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/lib/services/ApiServices";
import { ShoppingCart } from "lucide-react";
import { AddtoCartProps } from "@/lib/interfaces/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCartItems } from "@/redux/slices/cartSlice";

export default function AddToCartBtn({
  productId,
  productName,
}: AddtoCartProps) {
  const { data: session } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoggedIn(!!session?.accessToken);
  }, [session]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  async function handleAddToCart() {
    setIsAddingToCart(true);
    try {
      if (!session?.accessToken) {
        toast.error("You must be logged in to add items to your cart");
        return;
      }
      const res = await ApiService.addToCart(productId);
      toast.success(`${productName} added to cart successfully!`, {
        description: "You can review it in your cart.",
      });
      dispatch(setCartItems(res.numOfCartItems ?? 0));
      setIsAddingToCart(false);
    } catch (err) {
      toast.error("Failed to add item to cart", {
        description: "Please try again later.",
      });
    }
  }
  return (
    <>
      <Button
        disabled={!loggedIn || isAddingToCart}
        onClick={handleAddToCart}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
      >
        <ShoppingCart /> Add to Cart
      </Button>
    </>
  );
}
