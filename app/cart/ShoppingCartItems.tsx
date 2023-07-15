'use client'
import { Divider } from '@mui/material';
import ShoppingCartItem from './ShoppingCartItem';
import { useContext, useEffect, useState } from 'react';
import { CartItems, Store } from '@/utils/StoreProvider';

export default function ShoppingCartItems() {
  const { cart } = useContext(Store);
  const [cartInfo, setCartInfo] = useState<CartItems[]>();

  useEffect(() => {
    if (cart) {
      setCartInfo(cart);
    }
  }, [cart])

  return (
    <div>
      {cartInfo && cartInfo.map((item, index: number) => {
        const isLastItem = index === cartInfo.length - 1;
        const optionIndex = item.cartItem.options.findIndex((option) => option.size === item.optionId)
        return (
          <div key={index}>
            <Divider />
            <ShoppingCartItem
              item={item}
              optionIndex={optionIndex}
            />
            {isLastItem && <Divider />}
          </div>
        )
      })}
    </div>
  )
}
