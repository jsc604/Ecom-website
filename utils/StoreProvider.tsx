'use client'

import { ItemOptions } from "@/app/components/ProductItem";
import { getCookie } from "cookies-next";
import { createContext, useState } from "react";

export interface CartItems {
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
  const [cart, setCart] = useState<CartItems[]>(() => {
    const cartItemsCookie = getCookie('cartItems');
    if (typeof cartItemsCookie === 'string') {
      return JSON.parse(cartItemsCookie);
    }
    return initialCart;
  });

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

    const existingItem = cart.find((item) => item.optionId === optionId && item.itemId === itemId);

    if (stock && stock >= quantity) {
      if (existingItem) {
        if (existingItem.quantity + quantity <= stock) {
          const updatedCart = cart.map((item) =>
            item.optionId === existingItem.optionId && item.itemId === existingItem.itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setCart(updatedCart);
          // await fetch(`/api/products/${itemId}`, {
          //   method: 'POST',
          //   body: JSON.stringify({cart: updatedCart}),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });
        } else {
          window.alert('not enough stock');
        }
      } else {
        const newItem = {
          itemId,
          optionId,
          quantity: quantity,
        };
        setCart([...cart, newItem]);
        // await fetch(`/api/products/${itemId}`, {
        //   method: 'POST',
        //   body: JSON.stringify({cart: [...cart, newItem]}),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
      }
    }
  };

  return (
    <Store.Provider value={{ cart, handleAddToCart }}>
      {props.children}
    </Store.Provider>
  );
}
