"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-700 py-24 text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Discover Your Style with ShopSphere
      </h1>
      <p className="text-lg text-blue-100 mb-8 max-w-xl">
        Find the best products tailored just for you. Quality, comfort, and
        affordability in one place.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          asChild
        >
          <Link href="/products">Shop Now →</Link>
        </Button>

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          asChild
        >
          <Link href="/categories">View Categories</Link>
        </Button>
      </div>

      {/* Tagline */}
      <div className="text-sm text-blue-100 font-medium flex gap-3">
        <span>Free Shipping</span>
        <span>•</span>
        <span>30-Day Returns</span>
        <span>•</span>
        <span>Premium Support</span>
      </div>
    </section>
  );
}
