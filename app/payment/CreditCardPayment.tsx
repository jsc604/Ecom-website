import { TextField } from '@mui/material'

export default function CreditCardPayment() {
  return (
    <form className='my-4 space-y-4 w-full'>
      <TextField
        sx={{ width: '100%' }}
        required
        id="cardNumber"
        label="Card Number"
      // error
      // helperText={ }
      />
      <TextField
        sx={{ width: '100%' }}
        required
        id="nameOnCard"
        label="Name on card"
      // error
      // helperText={ }
      />
      <div className='flex gap-4'>
        <TextField
          sx={{ width: '100%' }}
          required
          id="expiration"
          label="Expiration(MM/YY)"
        // error
        // helperText={ }
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="cvv"
          label="CVV"
        // error
        // helperText={ }
        />
      </div>
    </form>
  )
}
