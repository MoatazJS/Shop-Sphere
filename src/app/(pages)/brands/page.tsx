import React from "react";
import { ApiService } from "@/lib/services/ApiServices";
import BrandCard from "@/app/components/layouts/BrandCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const brands = await ApiService.getAllBrands();

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      {/* Header */}
      <div className="px-6 text-center mb-12 bg-gradient-to-b from-blue-900 to-blue-700 py-24">
        <h1 className="text-4xl font-bold text-white">Shop by Brands</h1>
        <p className="text-white mt-3 max-w-2xl mx-auto">
          Discover your favorite brands and explore a wide range of products.
          Find trusted names and new arrivals all in one place.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-6">
        <BrandCard brands={brands} />
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-6 text-center mt-16">
        <h2 className="text-xl font-semibold text-gray-800">
          Can’t find your brand?
        </h2>
        <p className="text-gray-500">
          Browse our full product collection instead.
        </p>
        <Link href={"/products"}>
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
            Shop All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
