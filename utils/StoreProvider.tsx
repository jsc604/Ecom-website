'use client'

import { ItemOptions } from "@/app/components/ProductItem";
import { getCookie, setCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

export interface CartItems {
  itemId: string;
  optionId: string;
  quantity: number;
}

const initialCart: CartItems[] = [];

export const Store = createContext({
  cart: initialCart,
  handleAddToCart: (_itemId: string, _optionId: string, _quantity: number) => { },
  handleDeleteFromCart: (_optionId: string) => { },
});

export default function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [cart, setCart] = useState<CartItems[]>(() => {
    const cartItemsCookie = getCookie('cartItems');
    if (typeof cartItemsCookie === 'string') {
      return JSON.parse(cartItemsCookie);
    }
    return initialCart;
  });

  useEffect(() => {
    setCookie('cartItems', JSON.stringify(cart), { maxAge: 60 * 60 * 12 });
    console.log('cookie:', getCookie('cartItems'));
  }, [cart]);

  const handleAddToCart = async (itemId: string, optionId: string, quantity: number) => {
    const res = await fetch(`/api/products/${itemId}`);
    const data = await res.json();

    const selectedSize = optionId;

    const stock = data?.options.reduce((acc: number | undefined, option: ItemOptions) => {
      if (option.size === selectedSize) {
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
      }
    }
  };

  const handleDeleteFromCart = async (optionId: string) => {
    const updatedCart = cart.filter((item) => item.optionId !== optionId);
    setCart(updatedCart);
  }

  return (
    <Store.Provider value={{ cart, handleAddToCart, handleDeleteFromCart }}>
      {props.children}
    </Store.Provider>
  );
}
