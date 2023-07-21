'use client'
import { SetStateAction, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Collapse, Typography, Divider } from '@mui/material';
import ETransferPayment from './ETransferPayment';
import CreditCardPayment from './CreditCardPayment';
import PaypalPayment from './PaypalPayment';
import OrderSummary from './OrderSummary';

export default function PaymentMethod() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>

     <OrderSummary />

      <Divider orientation='vertical' flexItem />

      <div className='w-full sm:w-1/2 p-4'>
        <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Select Payment Method</Typography>
        <FormControl sx={{ width: '100%' }}>
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

    </div>
  );
}
