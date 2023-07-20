'use client'
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Collapse, Typography, Button, Divider } from '@mui/material';
import ETransferPayment from './ETransferPayment';
import CreditCardPayment from './CreditCardPayment';
import PaypalPayment from './PaypalPayment';
import ItemScroll from '../checkout/ItemScroll';
import { Store } from '@/utils/StoreProvider';
import { ItemInfo } from '../cart/CartContainer';

export default function PaymentMethod() {
  const { cart, userInfo, shippingInfo, setShippingInfo } = useContext(Store);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cart]);

  const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

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
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
      <div className='w-full sm:w-1/2 p-4'>
        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Select Payment Method</Typography>
        <FormControl sx={{width: '100%'}}>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="eTransfer" control={<Radio />} label="E-Transfer" />
            <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          </RadioGroup>

          <Collapse in={selectedOption === 'eTransfer'} unmountOnExit>
            <ETransferPayment />
          </Collapse>
          <Collapse in={selectedOption === 'creditCard'} unmountOnExit>
            <CreditCardPayment />
          </Collapse>
          <Collapse in={selectedOption === 'paypal'} unmountOnExit>
            <PaypalPayment />
          </Collapse>
        </FormControl>
      </div>

      <Divider orientation='vertical' flexItem/>
      
      <div className='w-full sm:w-1/2 p-4'>
        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Order Summary</Typography>
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
            <Button color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
