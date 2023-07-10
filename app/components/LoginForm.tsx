'use client'
import { TextField, Button } from "@mui/material"

export default function LoginForm() {
  return (
    <form>
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 my-2">
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
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <Button color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Log In</Button>
    </form>
  )
}
