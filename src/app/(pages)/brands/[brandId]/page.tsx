import { Button } from "@/components/ui/button";
import { ApiService } from "@/lib/services/ApiServices";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const brand = await ApiService.getSingleBrand(brandId);
  if (!brand?.data) {
    notFound();
  }
  const brandData = brand.data;
  return (
    <>
      <section className="p-6 flex flex-col text-center items-center">
        <h1 className="text-3xl font-bold">{brandData.name}</h1>
        <div className="relative w-full max-w-3xl h-[500px] mt-6">
          <Image
            src={brandData.image}
            alt={brandData.name}
            fill
            className="rounded-lg object-contain"
          />
        </div>
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
    </>
  );
}
