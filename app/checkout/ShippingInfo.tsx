'use client'
import { useContext, useEffect, useState } from 'react';
import LoginCard from './LoginCard'
import { Store } from '@/utils/StoreProvider';
import { Card, Typography, TextField, MenuItem, FormControlLabel, Radio, RadioGroup, Button, Divider } from '@mui/material';
import { useForm, SubmitHandler, FieldValues, Controller } from 'react-hook-form';
import ItemScroll from './ItemScroll';
import { ItemInfo } from '../cart/CartContainer';
import { setCookie } from 'cookies-next';
import { redirect, useRouter } from 'next/navigation';

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

export default function ShippingInfo() {
  const router = useRouter();
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { cart, userInfo, shippingInfo, setShippingInfo } = useContext(Store);

  useEffect(() => {
    if (userInfo) {
      setValue('firstName', userInfo.name.split(' ')[0]);
      setValue('lastName', userInfo.name.split(' ')[1]);
      setValue('email', userInfo.email);
    }
    if (shippingInfo) {
      setValue('address', shippingInfo.address);
      setValue('city', shippingInfo.city);
      setValue('province', shippingInfo.province);
      setValue('postalCode', shippingInfo.postalCode);
      setValue('shippingOption', shippingInfo.shippingOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, shippingInfo]);

  const [cartItemsInfo, setCartItemsInfo] = useState<ItemInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (cart.length > 0) {
        const res = await fetch('/api/cart');

        setCartItemsInfo(await res.json());
      } else {
        router.push('/cart');
      }
    }

    fetchData();
  }, [cart]);

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

  const submitHandler: SubmitHandler<FieldValues> = async ({ firstName, lastName, email, address, city, province, postalCode, shippingOption }) => {
    setShippingInfo({ firstName, lastName, email, address, city, province, postalCode, shippingOption });
    setCookie('shippingInfo', { firstName, lastName, email, address, city, province, postalCode, shippingOption }, { maxAge: 60 * 60 * 12 });
    router.push('/payment');
  }

  return (
    <div className="grid grid-cols-12 ml:gap-16">
      <div className="col-span-12 ml:col-span-8 xl:col-span-6 xl:col-start-2">
        <LoginCard />

        <form>
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
                    id="first name"
                    label="First Name"
                    type="text"
                    error={Boolean(errors.firstName)}
                    helperText={
                      errors.firstName
                        ? errors.firstName.type === 'minLength'
                          ? 'First Name has to be 2 or more characters in length.'
                          : 'First name is required'
                        : ''
                    }
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
                    id="last name"
                    label="Last Name"
                    type="text"
                    error={Boolean(errors.lastName)}
                    helperText={
                      errors.lastName ?
                        errors.lastName.type === 'minLength'
                          ? 'Last Name has to be 2 or more characters in length.'
                          : 'Last Name is required'
                        : ''
                    }
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
                  id="email"
                  label="Email"
                  type="email"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Please enter a valid email'
                        : 'Email is required'
                      : ''
                  }
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
                minLength: 5,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  id="address"
                  label="Address"
                  type="text"
                  placeholder="Include apt, suite, or floor number here"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Please enter a valid address.'
                        : 'Address is required'
                      : ''
                  }
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
                    id="city"
                    label="City"
                    type="text"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city?.type === 'minLength'
                          ? 'City has to be 2 or more characters in length.'
                          : 'City is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />

              <Controller
                name="province"
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%' }}
                    id="province"
                    label="Province"
                    select
                    error={Boolean(errors.province)}
                    helperText={errors.province ? 'Please select your province' : ''}
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
                  pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%' }}
                    id="postal code"
                    label="Postal Code"
                    type="text"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'pattern'
                          ? 'Please enter a valid postal code'
                          : 'Postal code is required'
                        : ''
                    }
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
        </form>
      </div>

      {/* --------ORDER SUMMARY-------- */}
      <div className="col-span-12 ml:col-span-4">
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
              <Button onClick={handleSubmit(submitHandler)} color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}