import { ApiService } from "@/lib/services/ApiServices";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await ApiService.getOneProduct(id);
  if (!res?.data) {
    notFound();
  }

  const product = res.data;
  console.log(product);
  return (
    <section className="max-w-5xl mx-auto p-6">
      {/* Layout: Image on the left, details on the right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg border shadow"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img: string, idx: number) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                width={120}
                height={120}
                className="rounded-md border cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-500 text-lg">
              ⭐ {product.ratingsAverage}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <p className="text-2xl font-semibold text-green-600 mt-4">
            ${product.price}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            In Stock: {product.quantity}
          </p>
          <p className="mt-1 text-sm text-gray-600">Sold: {product.sold}</p>

          {/* Category & Brand */}
          <div className="mt-6">
            <p className="font-semibold">Category:</p>
            <div className="flex items-center gap-2 mt-1">
              <Image
                src={product.category.image}
                alt={product.category.name}
                width={40}
                height={40}
                className="rounded"
              />
              <span>{product.category.name}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Brand:</p>
            <div className="flex items-center gap-2 mt-1">
              <Image
                src={product.brand.image}
                alt={product.brand.name}
                width={40}
                height={40}
                className="rounded"
              />
              <span>{product.brand.name}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
