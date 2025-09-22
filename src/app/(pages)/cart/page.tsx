import { ApiService } from "@/lib/services/ApiServices";
import React from "react";

export default async function page() {
  const cartData = ApiService.getUserCart;

  console.log(cartData);
  return (
    <>
      <h1>THIS IS CART</h1>
    </>
  );
}
