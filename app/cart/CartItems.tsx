'use client'

import { CartItems, Store } from '@/utils/StoreProvider';
import { useContext, useEffect, useState } from 'react'
import { productObject } from '../products/page';
import { Divider } from '@mui/material';
import CartItem from './CartItem';

interface ItemInfo {
  product: productObject;
  optionIndex: number;
  quantity: number;
}

export default function CartItems() {
  const { cart } = useContext(Store);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    async function fetchData() {
      if (cartItems.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cartItems]);

  return (
    <div>
      {cartItemsInfo && cartItemsInfo.map((item, index: number) => {
        const isLastItem = index === cartItemsInfo.length - 1;
        return (
          <>
            <Divider />
            <CartItem
              image={item.product.image}
              id={item.product._id}
              name={item.product.name}
              size={item.product.options[item.optionIndex].size}
              price={item.product.options[item.optionIndex].price}
              subtotal={item.product.options[item.optionIndex].price * item.quantity}
              quantity={item.quantity}
              countInStock={item.product.options[item.optionIndex].countInStock}
            />
            {isLastItem && <Divider />}
          </>
        )
      })}
    </div>
  )
}
