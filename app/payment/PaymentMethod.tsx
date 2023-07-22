'use client'
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Collapse, Typography, Divider } from '@mui/material';
import ETransferPayment from './ETransferPayment';
import CreditCardPayment from './CreditCardPayment';
import PaypalPayment from './PaypalPayment';
import OrderSummary from './OrderSummary';
import ShippingSummary from './ShippingSummary';
import { Store } from '@/utils/StoreProvider';
import { ItemInfo } from '../cart/CartContainer';

export default function PaymentMethod() {
  const { cart } = useContext(Store);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cart]);

  const [selectedOption, setSelectedOption] = useState('');

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

  const generateOrderNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderNumber = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters.charAt(randomIndex);
    }

    return orderNumber;
  };

  const [orderNumber, setOrderNumber] = useState(generateOrderNumber());

  return (
    <div className='flex flex-col lg:flex-row gap-4 sm:gap-8'>

      <div className='w-full lg:w-1/2 p-4 space-y-4'>
        <OrderSummary cartItemsInfo={cartItemsInfo}/>
        <ShippingSummary />
      </div>

      <Divider orientation='vertical' flexItem />

      <div className='w-full lg:w-1/2 p-4'>
        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Select Payment Method</Typography>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="eTransfer" control={<Radio />} label="E-Transfer" />
            <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          </RadioGroup>

          <Collapse in={selectedOption === 'eTransfer'} unmountOnExit>
            <ETransferPayment subtotal={subtotal} shippingPrice={shippingPrice} orderNumber={orderNumber} />
          </Collapse>
          <Collapse in={selectedOption === 'creditCard'} unmountOnExit>
            <CreditCardPayment />
          </Collapse>
          <Collapse in={selectedOption === 'paypal'} unmountOnExit>
            <PaypalPayment />
          </Collapse>
        </FormControl>
      </div>

    </div>
  );
}
