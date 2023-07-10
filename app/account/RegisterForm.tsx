'use client'
import { TextField, Button } from "@mui/material"

export default function RegisterForm() {
  return (
    <form>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <TextField
          sx={{ width: '100%' }}
          required
          id="firstName"
          label="First Name"
          type="text"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="lastName"
          label="Last Name"
          type="text"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="email"
          label="Email"
          type="email"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="emailConfirmation"
          label="Confirm Email"
          type="email"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Register</Button>
    </form>
  )
}
