import React from "react";
import { ApiService } from "@/lib/services/ApiServices";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryCard from "@/app/components/layouts/categoryCard";

export default async function Page() {
  const categories = await ApiService.getAllCategories();

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      {/* Header */}
      <div className="px-6 text-center mb-12 bg-gradient-to-b from-blue-900 to-blue-700 py-24">
        <h1 className="text-4xl font-bold text-white">
          Explore Our Categories
        </h1>
        <p className="text-white mt-3 max-w-2xl mx-auto">
          Browse through all our product categories and discover a wide variety
          of items from top brands. Find what you love quickly and easily.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-6">
        <CategoryCard categories={categories} />
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-6 text-center mt-16">
        <h2 className="text-xl font-semibold text-gray-800">
          Looking for something specific?
        </h2>
        <p className="text-gray-500">
          Explore our full product catalog to find the perfect item.
        </p>
        <Link href={"/products"}>
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
