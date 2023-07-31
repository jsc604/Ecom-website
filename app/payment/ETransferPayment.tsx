import { Button, CircularProgress, Step, StepLabel, Stepper, Typography } from "@mui/material";

interface PageProps {
  subtotal: number;
  shippingPrice: number;
  orderRef: string;
  handlePlaceOrder: () => {};
  loading: boolean;
}

export default function ETransferPayment({ subtotal, shippingPrice, orderRef, handlePlaceOrder, loading }: PageProps) {

  const total = (subtotal + shippingPrice).toFixed(2);
  const paymentEmail = 'admin@example.com';
  const paymentRecipient = 'Admin';
  const paymentPassword = '123456';

  const instructions = [
    `Send an e-Transfer to ${paymentEmail}`,
    `Save our name as ${paymentRecipient}`,
    `Set your payment amount to $${total}`,
    `Set the password to ${paymentPassword}`,
    `Include your order reference (${orderRef}) in the message`,
    `After sending payment and completing these steps click the PLACE ORDER button`
  ];

  return (
    <div className="space-y-2 mt-2">
      <Typography variant="h5" fontWeight="bold" >
        E-Transfer Payment Instructions
      </Typography>
      <Typography variant="body1" >
        Order Reference: <strong>{orderRef}</strong>
      </Typography>
      <Typography variant="body1" >
        Order Total: <strong>${total}</strong>
      </Typography>
      <Typography variant="body1" >
        Payment Email: <strong>{paymentEmail}</strong>
      </Typography>
      <Typography variant="body1" >
        Payment Recipient: <strong>{paymentRecipient}</strong>
      </Typography>
      <Typography variant="body1" >
        Payment Password: <strong>{paymentPassword}</strong>
      </Typography>

      <Stepper orientation="vertical">
        {instructions.map((step, i) => (
          <Step key={i} active>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Button onClick={handlePlaceOrder} variant="contained" color="success" className="bg-green-600" disabled={loading}>
        {loading ? <CircularProgress /> : 'Place Order'}
      </Button>
    </div>
  )
}
