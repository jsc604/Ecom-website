'use client'

import React, { createContext, useState } from "react";

interface CartItems {
  itemId: string;
  optionId: string;
  quantity: number;
}

export const Store = createContext({
  cart: [] as CartItems[],
  setCart: {} as React.Dispatch<React.SetStateAction<CartItems[]>>,
});

export default function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [cart, setCart] = useState<CartItems[]>([]);

  return (
    <Store.Provider value={{ cart, setCart }}>
      {props.children}
    </Store.Provider>
  );
}
