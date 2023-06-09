'use client'
import { CartItems, Store } from "@/utils/StoreProvider"
import { Button, ButtonProps, styled } from "@mui/material"
import { purple } from "@mui/material/colors";
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

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));
  
  return (
    <div className="text-center text-xl sm:text-4xl w-fit mx-auto">
      Your shopping bag is empty!
      <br />
      <div className="my-4">
        Give your bag some love...
        <br />
        <Link href={'/products'}>
          <ColorButton
            variant="contained"
            size='large'
            sx={{ fontSize: 'large', marginTop: 2 }}
          >
            Shop Now
          </ColorButton>
        </Link>
      </div>
    </div>
  )
}
