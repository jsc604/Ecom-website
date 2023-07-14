'use client'
import { useContext, useEffect, useState } from 'react';
import LoginCard from './LoginCard'
import { CartItems, Store } from '@/utils/StoreProvider';
import { Card, Typography, TextField, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup, Button, Divider } from '@mui/material';
import { useForm, SubmitHandler, FieldValues, Controller } from 'react-hook-form';
import router from 'next/router';
import ItemScroll from './ItemScroll';
import { ItemInfo } from '../cart/CartContainer';

const provinces = [
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
  { value: 'Northwest Territories', label: 'Northwest Territories' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Yukon', label: 'Yukon' },
];

export default function Shipping() {
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { userInfo, shippingInfo, setShippingInfo } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      setValue('firstName', userInfo.name.split(' ')[0]);
      setValue('lastName', userInfo.name.split(' ')[1]);
      setValue('email', userInfo.email);
    }
    if (shippingInfo) {
      setValue('address', shippingInfo?.address);
      setValue('city', shippingInfo.city);
      setValue('province', shippingInfo.province);
      setValue('postalCode', shippingInfo.postalCode);
      setValue('shippingOption', shippingInfo.shippingOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, shippingInfo]);

  const { cart } = useContext(Store);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    async function fetchData() {
      if (cartItems.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      }
    }

    fetchData();
  }, [cartItems]);

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

  const submitHandler: SubmitHandler<FieldValues> = async ({ shippingOption }) => {
    console.log('shippingOption: ', shippingOption);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} method='POST' className="grid grid-cols-12 ml:gap-16">
      <div className="col-span-12 ml:col-span-8 xl:col-span-6 xl:col-start-2">
        <LoginCard />

        {/* --------SHIPPING INFO INPUT-------- */}
        <Card sx={{ padding: 2 }} className="my-4 space-y-4">
          <Typography className="text-3xl font-semibold">Shipping Info</Typography>
          <div className="flex flex-col sm:flex-row gap-4">
            <Controller
              name="firstName"
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="first name"
                  label="First Name"
                  type="text"
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="last name"
                  label="Last Name"
                  type="text"
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            defaultValue=''
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            }}
            render={({ field }) => (
              <TextField
                sx={{ width: '100%' }}
                required
                id="email"
                label="Email"
                type="email"
                {...field}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            defaultValue=''
            rules={{
              required: true,
              minLength: 2,
            }}
            render={({ field }) => (
              <TextField
                sx={{ width: '100%' }}
                required
                id="address"
                label="Address"
                type="text"
                placeholder="Include apt, suite, or floor number here"
                {...field}
              />
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Controller
              name="city"
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="city"
                  label="City"
                  type="text"
                  {...field}
                />
              )}
            />

            <Controller
              name="province"
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="province"
                  label="Province"
                  select
                  {...field}
                >
                  {provinces.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="postalCode"
              control={control}
              defaultValue=''
              rules={{
                required: true,
                minLength: 2,
                pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="postal code"
                  label="Postal Code"
                  type="text"
                  {...field}
                />
              )}
            />
          </div>
        </Card>

        {/* --------SHIPPING OPTIONS-------- */}
        <Card sx={{ padding: 2 }}>
          <Typography className="text-3xl font-semibold">Shipping Options</Typography>
          <Controller
            name="shippingOption"
            control={control}
            defaultValue="Canada Post Xpresspost"
            render={({ field }) => (
              <RadioGroup
                aria-labelledby="shipping options group"
                {...field}
              >
                <FormControlLabel value="Canada Post Xpresspost" control={<Radio />} label="Canada Post Xpresspost" />
                <FormControlLabel value="FedEx Ground" control={<Radio />} label="FedEx Ground" />
              </RadioGroup>
            )}
          />
        </Card>
      </div>

      {/* --------ORDER SUMMARY-------- */}
      <div className="col-span-12 ml:col-span-4 xl:col-span-3">
        <div className='w-full mb-8'>
          <h1 className="text-center font-semibold mb-4 max-lg:mt-4 text-3xl">Order Summary</h1>
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
              <Button type='submit' color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

    </form>
  )
}