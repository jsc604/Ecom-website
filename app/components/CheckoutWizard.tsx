'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { AttachMoney, PointOfSale, ReceiptLong, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: completed ? <Link href={'/cart'}><ShoppingCart /></Link> : <ShoppingCart />,
    2: completed ? <Link href={'/checkout'}><PointOfSale /></Link> : <PointOfSale />,
    3: completed ? <Link href={'/payment'}> <AttachMoney /></Link> : <AttachMoney />,
    4: completed ? <Link href={'/history'}><ReceiptLong /></Link> : <ReceiptLong />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Cart', 'Checkout', 'Payment', 'Transaction Summary'];
const links = ['cart', 'checkout', 'payment', 'history'];

export default function CustomizedSteppers({ activeStep = 0 }) {
  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{ marginBottom: 4 }}>
      {steps.map((label, index) => {
        const isStepCompleted = index < activeStep;
        const link = isStepCompleted ? `/${links[index]}` : '#';
        return (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} className={isStepCompleted ? 'hover:underline' : 'disabled-link'}>
              {index < activeStep ? (
                <Link href={link}>
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  );
}