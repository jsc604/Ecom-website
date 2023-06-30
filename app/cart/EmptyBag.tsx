'use client'

import { CartItems, Store } from "@/utils/StoreProvider"
import { Button } from "@mui/material"
import Link from "next/link";

import { useContext, useEffect, useState } from "react"

export default function EmptyBag() {

  const { cart } = useContext(Store);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  if (cartItems.length > 0) {
    return <></>;
  }

  return (
    <div className="text-center text-3xl w-fit mx-auto">
      Your shopping bag is empty!
      <br />
      Give your bag some love
      <br />
      <Link href={'/products'}>
        <Button
          variant="contained"
          color="success"
          size='large'
          sx={{ marginY: 4, fontSize: 'large' }}
          className='bg-green-600'
        >
          Shop Now
        </Button>
      </Link>
    </div>
  )
}
