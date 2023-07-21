'use client'

import { Typography, Card } from "@mui/material"
import { useContext, useState, useEffect } from "react";
import { ItemInfo } from "../cart/CartContainer";
import { Store } from "@/utils/StoreProvider";
import ItemsSummary from "./ItemsSummary";

export default function OrderSummary() {
  const { cart, userInfo, shippingInfo } = useContext(Store);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cart]);

  const shippingPrice = 20;

  const getSubtotal = (() => {
    let subtotal = 0;
    cartItemsInfo.map((item) => {
      const itemSubtotal = item.product.options[item.optionIndex].price * item.quantity;
      subtotal += itemSubtotal;
    })
    return subtotal;
  });

  const subtotal = getSubtotal();

  return (
    <div className='w-full sm:w-1/2 p-4'>
      <Card>
        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Order Summary</Typography>
        <ItemsSummary cartItemsInfo={cartItemsInfo} />
      </Card>

      <Card>
      </Card>

    </div>
  )
}
