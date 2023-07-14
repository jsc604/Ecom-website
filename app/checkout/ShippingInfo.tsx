'use client'
import { Card, FormControl, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ShippingOptions from "./ShippingOptions";
import { getCookie, setCookie } from "cookies-next";
import { Store } from "@/utils/StoreProvider";

export default function ShippingInfo() {
  const { userInfo, shippingInfo, setShippingInfo } = useContext(Store);
  const [firstName, setFirstName] = useState(userInfo !== null ? userInfo.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(userInfo !== null ? userInfo.name.split(' ')[1] : '');
  const [email, setEmail] = useState(userInfo !== null ? userInfo.email : '');
  const [address, setAddress] = useState(shippingInfo !== null && shippingInfo.address ? shippingInfo.address : '');
  const [city, setCity] = useState(shippingInfo !== null && shippingInfo.city ? shippingInfo.city :'');
  const [province, setProvince] = useState(shippingInfo !== null && shippingInfo.province ? shippingInfo.province :'');
  const [postalCode, setPostalCode] = useState(shippingInfo !== null && shippingInfo.postalCode ? shippingInfo.postalCode :'');

  useEffect(() => {
    setCookie(
      'shippingInfo',
      JSON.stringify({ firstName, lastName, email, address, city, province, postalCode }),
      { maxAge: 60 * 60 * 12 }
    );
    setShippingInfo({ firstName, lastName, email, address, city, province, postalCode });
    console.log('shippingInfo: ', shippingInfo);
    console.log('shipping-cookie:', JSON.parse(getCookie('shippingInfo') as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, address, city, province, postalCode]);

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

  return (
    <form>
      <Card sx={{ padding: 2 }} className="my-4 space-y-4">
        <Typography className="text-3xl font-semibold">Shipping Info</Typography>

        <div className="flex gap-4">
          <FormControl sx={{ width: '100%' }}>
            <TextField
              required
              id="first name"
              value={firstName}
              label="First Name"
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              error={firstName.length < 2}
              helperText="First name has to be at least 2 characters in length"
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              required
              id="last name"
              value={lastName}
              label="Last Name"
              type="text"
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormControl>
        </div>

        <FormControl sx={{ width: '100%' }}>
          <TextField
            required
            id="email"
            value={email}
            label="Email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{ width: '100%' }}>
          <TextField
            required
            id="address"
            value={address}
            label="Address"
            type="text"
            placeholder="Include apt, suite, or floor number here"
            onChange={(event) => setAddress(event.target.value)}
          />
        </FormControl>

        <div className="flex flex-col sm:flex-row gap-4">
          <FormControl sx={{ width: '100%' }}>
            <TextField
              required
              id="city"
              value={city}
              label="City"
              type="text"
              onChange={(event) => setCity(event.target.value)}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              required
              id="province"
              value={province}
              label="Province"
              select
              onChange={(event) => setProvince(event.target.value)}
            >
              {provinces.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              required
              id="postal code"
              value={postalCode}
              label="Postal Code"
              type="text"
              onChange={(event) => setPostalCode(event.target.value)}
            />
          </FormControl>
        </div>
      </Card>

      <ShippingOptions />
    </form>
  )
}
