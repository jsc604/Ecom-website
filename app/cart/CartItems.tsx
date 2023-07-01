'use client'
import { CartItems, Store } from '@/utils/StoreProvider';
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { productObject } from '../products/page';

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

  console.log('cartItemsInfo: ', cartItemsInfo && cartItemsInfo);

  return (
    <div>
      {cartItemsInfo && cartItemsInfo.map((item, index: number) => {
        return (
          <div key={index} className='grid grid-cols-12 gap-4 my-4'>
            <div className="relative aspect-square col-span-2 rounded-md">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                loading="lazy"
                className="object-cover rounded-md"
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='col-span-4'>
              <div className='text-xl font-bold'>{item.product.name}</div>
              <div>{item.product.options[item.optionIndex].size}</div>
            </div>
            <div className='col-span-2 text-center'>
              <div>Item Price</div>
              <div>${(item.product.options[item.optionIndex].price).toFixed(2)}</div>
            </div>
            <div className='col-span-2 text-center'>
              <div>Quantity</div>
              <div>{item.quantity}</div>
            </div>
            <div className='col-span-2 text-center'>
              <div>Subtotal</div>
              <div>${(item.product.options[item.optionIndex].price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
