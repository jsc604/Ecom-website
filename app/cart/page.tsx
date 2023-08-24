'use client'
import EmptyBag from "./EmptyBag";
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/StoreProvider";
import CheckoutWizard from "../components/CheckoutWizard";
import CartSummary from "./CartSummary";
import ShoppingCartItems from "./ShoppingCartItems";
import { productObject } from "../products/page";
import { getCartItems } from "@/utils/fetchDataFunctions";

export interface ItemInfo {
  product: productObject;
  optionIndex: number;
  quantity: number;
}

export default function Cart() {
  const { cart } = useContext(Store);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    if (cart) {
      const fetchData = async () => {
        const fetchedData = await getCartItems(cart);
        setCartItemsInfo(fetchedData);
      };

      fetchData();
    } else {
      <EmptyBag />
    }
  }, [cart]);

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
