'use client'
import { ItemOptions } from "@/app/components/ProductItem";
import { getCookie, setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "./toastOptions";

export interface CartItems {
  itemId: string;
  optionId: string;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  shippingOption: string;
}

export interface UserInfo {
  token: string;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const initialCart: CartItems[] = [];

export const Store = createContext({
  cart: initialCart,
  setCart: (cart: CartItems[]) => { },
  handleAddToCart: (_itemId: string, _optionId: string, _quantity: number) => { },
  handleDeleteFromCart: (_optionId: string) => { },
  userInfo: null as UserInfo | null,
  setUserInfo: (userInfo: UserInfo) => { },
  handleUserLogout: () => { },
  shippingInfo: null as ShippingInfo | null,
  setShippingInfo: (shippingInfo: ShippingInfo) => { },
});

export default function StoreProvider(props: React.PropsWithChildren<{}>) {
  const path = usePathname();

  //Setting Shipping State
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shippingInfoCookie = getCookie('shippingInfo');
      if (typeof shippingInfoCookie === 'string') {
        setShippingInfo(JSON.parse(shippingInfoCookie));
      } else {
        setShippingInfo(null);
      }
    }
  }, []);

  // Setting User State
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfoCookie = getCookie('userInfo');
      if (typeof userInfoCookie === 'string') {
        setUserInfo(JSON.parse(userInfoCookie));
      } else {
        setUserInfo(null);
      }
    }
  }, []);

  //Setting Cart State
  const [cart, setCart] = useState<CartItems[]>(() => {
    const cartItemsCookie = getCookie('cartItems');
    if (typeof cartItemsCookie === 'string') {
      return JSON.parse(cartItemsCookie);
    }
    return initialCart;
  });

  useEffect(() => {
    setCookie('cartItems', JSON.stringify(cart), { maxAge: 60 * 60 * 12 });
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
          if (path !== '/cart') {
            toast.success(`Item has been added to your cart!`, toastOptions);
          }
        } else {
          toast.error(`Not enough stock!`, toastOptions);
        }
      } else {
        const newItem = {
          itemId,
          optionId,
          quantity: quantity,
        };
        setCart([...cart, newItem]);
        if (path !== '/cart') {
          toast.success(`Item has been added to your cart!`, toastOptions);
        }
      }
    }
  };

  const handleDeleteFromCart = async (optionId: string) => {
    const updatedCart = cart.filter((item) => item.optionId !== optionId);
    setCart(updatedCart);
  }

  const handleUserLogout = () => {
    setUserInfo(null);
    setCart(initialCart);
    setShippingInfo(null);
  }

  return (
    <Store.Provider value={{ cart, setCart, handleAddToCart, handleDeleteFromCart, userInfo, setUserInfo, handleUserLogout, shippingInfo, setShippingInfo }}>
      {props.children}
    </Store.Provider>
  );
}
