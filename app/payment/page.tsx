'use client'
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Collapse, Typography, Divider } from '@mui/material';
import ETransferPayment from './ETransferPayment';
import CreditCardPayment from './CreditCardPayment';
import PaypalPayment from './PaypalPayment';
import OrderSummary from './OrderSummary';
import ShippingSummary from './ShippingSummary';
import CheckoutWizard from './../components/CheckoutWizard';
import { Store } from '@/utils/StoreProvider';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ItemInfo } from '../cart/page';
import { toastOptions } from '@/utils/toastOptions';

export default function Payment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cart, setCart, shippingInfo, userInfo } = useContext(Store);
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

  const getSubtotal = (() => {
    let subtotal = 0;
    cartItemsInfo.map((item) => {
      const itemSubtotal = item.product.options[item.optionIndex].price * item.quantity;
      subtotal += itemSubtotal;
    })
    return subtotal;
  });

  const subtotal = getSubtotal();

  const shippingPrice = subtotal > 200 ? 0 : 20;

  const generateOrderRef = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderRef = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderRef += characters.charAt(randomIndex);
    }

    return orderRef;
  };

  const [orderRef, setOrderRef] = useState(generateOrderRef());

  const handlePlaceOrder = async () => {
    setLoading(true);

    let headers: { 'Content-Type': string, authorization?: string } = {
      'Content-Type': 'application/json',
    };

    if (userInfo?.token) {
      headers.authorization = `Bearer ${userInfo.token}`;
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        orderRef,
        orderItems: cartItemsInfo,
        shippingInfo,
        paymentMethod: selectedOption,
        subtotal,
        shippingPrice,
        totalPrice: subtotal + shippingPrice,
      }),
      headers,
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoading(false);
      toast.error(`Error placing order!`, toastOptions);
      return;
    }

    setCart([]);
    deleteCookie('cartItems');
    setLoading(false);
    router.push(`/orders/${data._id}`)
    toast.success(`Success! Your order has been placed!`, toastOptions);
  }

  return (
    <>
      <CheckoutWizard activeStep={2} />
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-8'>

        <div className='w-full lg:w-1/2 p-4 space-y-8'>
          <OrderSummary cartItemsInfo={cartItemsInfo} subtotal={subtotal} shippingPrice={shippingPrice} />
          <ShippingSummary />
        </div>

        <Divider className='hidden lg:block' orientation='vertical' flexItem />

        <div className='w-full lg:w-1/2 p-4'>
          <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Select Payment Method</Typography>
          <FormControl sx={{ width: '100%' }}>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              <FormControlLabel value="eTransfer" control={<Radio />} label="E-Transfer" />
              <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
            </RadioGroup>

            <Collapse in={selectedOption === 'eTransfer'} unmountOnExit>
              <ETransferPayment subtotal={subtotal} shippingPrice={shippingPrice} orderRef={orderRef} handlePlaceOrder={handlePlaceOrder} loading={loading} />
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
    </>
  );
}
