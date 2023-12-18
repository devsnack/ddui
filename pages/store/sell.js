import SellProducts from "@/components/store/addsell";
import useAuth from "@/hooks/useAuth";
import { CartProvider } from "react-use-cart";
import React from "react";

function AddStorePage() {
  return (
    <CartProvider>
      <SellProducts suppressHydrationWarning={true}></SellProducts>
    </CartProvider>
  );
}

export default AddStorePage;
