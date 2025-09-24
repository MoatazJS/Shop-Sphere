import React from "react";
import { ProductsProps } from "@/lib/interfaces/interface";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import WishlistButton from "./WishListBtn";

export default function ProductCard({ products }: ProductsProps) {
  return (
    <div className="mt-10 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {" "}
      {products.data.map((product) => (
        <Card
          key={product._id}
          className="hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col"
        >
          <Link href={`/products/${product._id}`}>
            {/* Image */}
            <div className="relative w-full h-96 flex items-center justify-center bg-gray-50">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
              <WishlistButton productId={product._id} />
            </div>

            {/* Details */}
            <CardContent className="p-4 flex-1">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>

              {/* Price & Rating */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-orange-600 font-bold text-lg">
                  ${product.price}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  ⭐ {product.ratingsAverage} ({product.ratingsQuantity})
                </span>
              </div>
            </CardContent>
          </Link>
          {/* Footer */}
          <CardFooter className="mt-auto">
            <AddToCartBtn productId={product._id} productName={product.title} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
