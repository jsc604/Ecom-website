'use client'
import { ItemOptions } from "@/app/components/ProductItem";
import { ProductInfoProps } from "@/app/products/[category]/[slug]/ProductContainer";
import { getCookie, setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface CartItems {
  cartItem: ProductInfoProps;
  optionId: string;
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  shippingOption: string;
}

interface UserInfo {
  token: string;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const initialCart: CartItems[] = [];

export const Store = createContext({
  cart: initialCart,
  handleAddToCart: (newItem: ProductInfoProps, optionId: string, quantity: number) => { },
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
    console.log('cart-cookie:', getCookie('cartItems'));
  }, [cart]);


  const handleAddToCart = async (newItem: ProductInfoProps, optionId: string, quantity: number) => {
    const res = await fetch(`/api/products/${newItem.category}/${newItem.slug}`);
    const data = await res.json();

    const selectedSize = optionId;

    const stock = data?.options.reduce((acc: number | undefined, option: ItemOptions) => {
      if (option.size === selectedSize) {
        return option.countInStock;
      }
      return acc;
    }, undefined);

    const existingItem = cart.find((item) => item.optionId === optionId && item.cartItem._id === newItem._id);

    if (stock && stock >= quantity) {
      if (existingItem) {
        if (existingItem.quantity + quantity <= stock) {
          const updatedCart = cart.map((item) =>
            item.optionId === existingItem.optionId && item.cartItem._id === existingItem.cartItem._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setCart(updatedCart);
          if (path !== '/cart') {
            toast.success(`Item has been added to your cart!`, {
              position: "top-center",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          toast.error(`Not enough stock!`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        const newCartItem = {
          cartItem: newItem,
          optionId,
          quantity: quantity,
        };
        setCart([...cart, newCartItem]);
        if (path !== '/cart') {
          toast.success(`Item has been added to your cart!`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
    <Store.Provider value={{ cart, handleAddToCart, handleDeleteFromCart, userInfo, setUserInfo, handleUserLogout, shippingInfo, setShippingInfo }}>
      {props.children}
    </Store.Provider>
  );
}
