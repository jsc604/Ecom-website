'use client'
import EmptyBag from "./EmptyBag";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/StoreProvider";
import CheckoutWizard from "../components/CheckoutWizard";
import CartSummary from "./CartSummary";
import ShoppingCartItems from "./ShoppingCartItems";
import { productObject } from "../products/page";

export interface ItemInfo {
  product: productObject;
  optionIndex: number;
  quantity: number;
}

export default function Cart() {
  const { cart } = useContext(Store);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const res = await fetch('/api/cart');

        if (!res.ok) {
          <EmptyBag />;
        }

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cart]);

  if (cart.length < 1) {
    return <EmptyBag />;
  }

  return (
    <>
      <CheckoutWizard activeStep={0} />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
        <div className="col-span-2">
          <ShoppingCartItems cartItemsInfo={cartItemsInfo} />
        </div>
        <div className="lg:col-span-1">
          <CartSummary cartItemsInfo={cartItemsInfo} />
        </div>
      </div>
    </>
  )
}
