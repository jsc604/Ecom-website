'use client'
import { CartItems, Store } from '@/utils/StoreProvider';
import { useContext, useEffect, useState } from 'react'
import { productObject } from '../products/AllProducts';
import ShoppingCartItems from './ShoppingCartItems';
import CartSummary from './CartSummary';

export interface ItemInfo {
  product: productObject;
  optionIndex: number;
  quantity: number;
}

export default function CartContainer() {
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
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-16">
      <div className="col-span-3">
        <ShoppingCartItems cartItemsInfo={cartItemsInfo} />
      </div>
      <div className="lg:col-span-1">
        <CartSummary cartItemsInfo={cartItemsInfo} />
      </div>
    </div>
  )
}
