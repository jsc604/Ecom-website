'use client'
import Image from 'next/image'
import { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Box, Card, Tab, Tabs } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LoginContainer() {
  const [isNewUser, setIsNewUser] = useState<Boolean>(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsNewUser(!isNewUser);
  };

  return (
    <div className="grid grid-cols-12 ml:gap-16 mt-8">
      <Card className='col-span-12 lg:col-span-10 lg:col-start-2 flex rounded-3xl' elevation={8}>

        <div className="w-full ml:w-1/2 relative aspect-square max-ml:hidden">
          <Image
            src={isNewUser ? '/../public/images/profile pic 2.avif' : '/../public/images/loginprofile.avif'}
            alt='login image'
            fill
            className='object-cover'
          />
        </div>

        <div className="w-full ml:w-1/2 aspect-square">
          <Box sx={{ width: '100%', marginX: 'auto', marginY: 4 }} >
            <div className='text-center text-2xl sm:text-3xl font-semibold mb-4'>Join our community!</div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX: 4 }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Log in" {...a11yProps(0)} sx={{ width: '50%' }} />
                <Tab label="Register" {...a11yProps(1)} sx={{ width: '50%' }} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <h1 className="text-center font-semibold mb-8 text-xl sm:text-2xl">Log in to your member account</h1>
              <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <h1 className="text-center font-semibold mb-8 text-xl sm:text-2xl">Create a member account</h1>
              <RegisterForm />
            </CustomTabPanel>
          </Box>
        </div>
      </Card>
    </div>
  )
}
