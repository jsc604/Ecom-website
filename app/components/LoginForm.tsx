'use client'
import { TextField, Button } from "@mui/material"
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await Promise.resolve(res.json());
      setCookie('userInfo', data, { maxAge: 60 * 60 * 12 });
      console.log('cookie: ', JSON.parse(getCookie('userInfo') as string));
    } catch (error) {
      // console.log('error: ', error);
    }
  }

  return (
    <form onSubmit={submitHandler} method="POST">
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 my-2">
        <TextField
          sx={{ width: '100%' }}
          required
          id="email"
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type='submit' color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Log In</Button>
    </form>
  )
}
