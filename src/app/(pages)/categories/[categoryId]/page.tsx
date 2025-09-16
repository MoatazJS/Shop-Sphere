import { Button } from "@/components/ui/button";
import { ApiService } from "@/lib/services/ApiServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const res = await ApiService.getOneCategory(categoryId);
  if (!res?.data) {
    notFound();
  }
  const categoryData = res.data;
  return (
    <>
      <section className="p-6 flex flex-col text-center items-center">
        <h1 className="text-3xl font-bold">{categoryData.name}</h1>
        <div className="relative w-full max-w-3xl h-[500px] mt-6">
          <Image
            src={categoryData.image}
            alt={categoryData.name}
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
