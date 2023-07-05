'use client'
import { Button, Divider } from '@mui/material'
import { ItemInfo } from './CartContainer';

interface PageProps {
  cartItemsInfo: ItemInfo[];
}

export default function CartSummary({ cartItemsInfo }: PageProps) {
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
    <div className=''>
      <h1 className="text-center font-semibold my-4 text-2xl">Order Summary</h1>
      <div className='space-y-4'>
        <div className='flex justify-between items-start'>
          <div>Subtotal</div>
          <div>${subtotal}</div>
        </div>
        <div className='flex justify-between items-start'>
          <div>Shipping</div>
          <div>{subtotal > 200 ? 'Free Shipping' : `$${shippingPrice.toFixed(2)}`}</div>
        </div>
        <Divider />
        <div className='flex justify-between items-start'>
          <div>Total</div>
          <div>${subtotal > 200 ? subtotal : subtotal + shippingPrice}</div>
        </div>
        <div className='my-2 mx-auto text-center'>
          <Button color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
