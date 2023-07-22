'use client'
import { Email, AttachMoney, Lock } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";

interface PageProps {
  subtotal: number;
  shippingPrice: number;
  orderNumber: string;
}

export default function ETransferPayment({ subtotal, shippingPrice, orderNumber }: PageProps) {

  const total = subtotal > 200 ? subtotal.toFixed(2) : (subtotal + shippingPrice).toFixed(2);
  const paymentEmail = 'admin@example.com';
  const paymentRecipient = 'Admin';
  const paymentPassword = '123456';

  const instructions = [
    `Send an e-Transfer to ${paymentEmail}`,
    `Save our name as ${paymentRecipient}`,
    `Set your payment amount to $${total}`,
    `Set the password to ${paymentPassword}`,
    `Include your order number (${orderNumber}) in the message`,
    `After completing these steps click the PLACE ORDER button`
  ];

  return (
    <form className="space-y-2 mt-2">
      <Typography variant="h5" fontWeight="bold" >
        E-Transfer Payment Instructions
      </Typography>
      <Typography variant="body1" >
        Order Number: <strong>{orderNumber}</strong>
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
            <StepLabel sx={{color: green[600]}}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Button type="submit" variant="contained" color="success" className="bg-green-600">
        Place Order
      </Button>
    </form>
  )
}
