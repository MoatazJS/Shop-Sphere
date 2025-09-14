import ProductCard from "@/app/components/layouts/productCard";
import { ProductsResponse } from "@/lib/interfaces/interface";
import { ApiService } from "@/lib/services/ApiServices";

import React from "react";
const products: ProductsResponse = await ApiService.getAllProducts();
console.log(products);
export default function page() {
  return (
    <>
      <ProductCard products={products} />
    </>
  );
}
