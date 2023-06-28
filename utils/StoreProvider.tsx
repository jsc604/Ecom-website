'use client'

import { ItemOptions } from "@/app/components/ProductItem";
import { createContext, useState } from "react";

interface CartItems {
  itemId: string;
  optionId: string;
  quantity: number;
}

const initialCart: CartItems[] = [];

export const Store = createContext({
  cart: initialCart,
  handleAddToCart: (_itemId: string, _optionId: string, _quantity: number) => { },
});

export default function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [cart, setCart] = useState<CartItems[]>(initialCart);

  const handleAddToCart = async (itemId: string, optionId: string, quantity: number) => {
    const res = await fetch(`/api/products/${itemId}`);
    const data = await res.json();

    const selectedSizeId = optionId;

    const stock = data?.options.reduce((acc: number | undefined, option: ItemOptions) => {
      if (option._id === selectedSizeId) {
        return option.countInStock;
      }
      return acc;
    }, undefined);

    console.log('stock: ', stock);
    const existingItem = cart.find((item) => item.optionId === optionId && item.itemId === itemId);

    if (stock && stock >= quantity) {
      if (existingItem) {
        if (existingItem.quantity + quantity <= stock){
          const updatedCart = cart.map((item) =>
          item.optionId === existingItem.optionId && item.itemId === existingItem.itemId
          ? { ...item, quantity: item.quantity + quantity }
          : item
          );
          setCart(updatedCart);
        } else {
          console.log('not enough stock')
          return;
        }
      } else {
        const newItem = {
          itemId,
          optionId,
          quantity: quantity,
        };
        setCart([...cart, newItem]);
      }
    }
  };

  return (
    <Store.Provider value={{ cart, handleAddToCart }}>
      {props.children}
    </Store.Provider>
  );
}
