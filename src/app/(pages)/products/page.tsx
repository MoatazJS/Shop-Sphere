import ProductCard from "@/app/components/layouts/productCard";
import { Button } from "@/components/ui/button";
import { ProductsResponse } from "@/lib/interfaces/interface";
import { ApiService } from "@/lib/services/ApiServices";
import Link from "next/link";

import React from "react";
const products: ProductsResponse = await ApiService.getAllProducts();
export default function page() {
  return (
    <>
      <section className="bg-gray-50 min-h-screen py-12">
        <div className="px-6 text-center mb-12 bg-gradient-to-b from-blue-900 to-blue-700 py-24 ">
          <h1 className="text-4xl font-bold text-white">Our Products</h1>
          <p className="text-white mt-3 max-w-2xl mx-auto">
            Browse through our wide collection of top-quality products. Find the
            latest arrivals, best sellers, and everything you need all in one
            place.
          </p>
        </div>
        <ProductCard products={products} />
        <div className="container mx-auto px-6 text-center mt-16">
          <Link href="/">
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
