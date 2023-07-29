import { Button, Divider } from '@mui/material'
import { useRouter } from 'next/navigation';
import { ItemInfo } from './page';

interface PageProps {
  cartItemsInfo: ItemInfo[];
}

export default function CartSummary({ cartItemsInfo }: PageProps) {
  const router = useRouter();

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
    <div className='w-full'>
      <h1 className="text-center font-semibold mb-4 max-lg:mt-4 text-3xl">Order Summary</h1>
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
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
