'use client'
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function ShippingOptions() {
  const [shippingOption, setShippingOption] = useState('Canada Post Xpresspost');

  return (
    <Card sx={{ padding: 2 }}>
      <Typography className="text-3xl font-semibold">Shipping Options</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={shippingOption}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setShippingOption((event.target as HTMLInputElement).value)}
        >
          <FormControlLabel value="Canada Post Xpresspost" control={<Radio />} label="Canada Post Xpresspost" />
        </RadioGroup>
      </FormControl>
    </Card>
  )
}
