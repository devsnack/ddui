import SellProducts from "@/components/store/addsell";
import useAuth from "@/hooks/useAuth";
import { CartProvider } from "react-use-cart";
import React from "react";
import withAuth from "@/components/keepon/withauth";

function AddStorePage() {
  return (
    <CartProvider>
      <SellProducts suppressHydrationWarning={true}></SellProducts>
    </CartProvider>
  );
}

export default withAuth(AddStorePage);
