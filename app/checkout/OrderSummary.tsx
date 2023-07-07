'use client'
import { Button, Divider } from '@mui/material'
import { useRouter } from 'next/navigation';
import { ItemInfo } from '../cart/CartContainer';
import { useContext, useEffect, useState } from 'react';
import { CartItems, Store } from '@/utils/StoreProvider';
import ItemScroll from './ItemScroll';

export default function OrderSummary() {
  const router = useRouter();

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
    <div className='w-full mb-8'>
      <h1 className="text-center font-semibold mb-4 max-lg:mt-4 text-3xl">Order Summary</h1>
      <ItemScroll cartItemsInfo={cartItemsInfo} />
      <Divider />
      <div className='space-y-4'>
        <div className='flex justify-between items-start'>
          <div>Subtotal</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
        <div className='flex justify-between items-start'>
          <div>Shipping</div>
          <div>{subtotal > 200 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</div>
        </div>
        <Divider />
        <div className='flex justify-between items-start'>
          <div>Total</div>
          <div>${subtotal > 200 ? subtotal.toFixed(2) : (subtotal + shippingPrice).toFixed(2)}</div>
        </div>
        <div className='my-2 mx-auto text-center'>
          <Button onClick={() => router.push('/checkout')} color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>
            Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
