'use client'

import { Step, StepLabel, Stepper } from "@mui/material"

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
    >
      {['cart', 'Checkout', 'Payment', 'Transaction Details'].map((step) => {
        return (
          <Step key={step} sx={{marginBottom: 4}}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}
