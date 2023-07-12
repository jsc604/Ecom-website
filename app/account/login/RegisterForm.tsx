'use client'
import { Store } from "@/utils/StoreProvider";
import { TextField, Button } from "@mui/material"
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function RegisterForm() {
  const { setUserInfo } = useContext(Store);
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      alert('emails dont match');
      return;
    }
    if (password !== confirmPassword) {
      alert('passwords dont match');
      return;
    }
    const res = await fetch('/api/account/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email: email.toLowerCase(), password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      throw new Error(data.message);
    }

    setCookie('userInfo', data, { maxAge: 60 * 60 * 12 });
    setUserInfo(data);
    router.push('/');
  }

  return (
    <form method="POST" onSubmit={submitHandler}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <TextField
          sx={{ width: '100%' }}
          required
          id="firstName"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="lastName"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="emailConfirmation"
          label="Confirm Email"
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          sx={{ width: '100%' }}
          required
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type='submit' color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Register</Button>
    </form>
  )
}
