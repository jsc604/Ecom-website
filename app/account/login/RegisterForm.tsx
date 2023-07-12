'use client'
import { Store } from "@/utils/StoreProvider";
import { TextField, Button } from "@mui/material"
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function RegisterForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { setUserInfo } = useContext(Store);
  const router = useRouter();

  const submitHandler: SubmitHandler<FieldValues> = async ({ firstName, lastName, email, confirmEmail, password, confirmPassword }) => {
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
    <form method="POST" onSubmit={handleSubmit(submitHandler)}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
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
              id="firstName"
              label="First Name"
              type="text"
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'minLength'
                    ? 'First Name has to be 2 or more characters in length'
                    : 'Please fill out this field'
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
              required
              id="lastName"
              label="Last Name"
              type="text"
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'minLength'
                    ? 'Last Name has to be 2 or more characters in length'
                    : 'Please fill out this field'
                  : ''
              }
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=''
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              id="email"
              label="Email"
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'pattern'
                    ? 'Email is not valid'
                    : 'Please fill out this field'
                  : ''
              }
              {...field}
            />
          )}
        />
        <Controller
          name="confirmEmail"
          control={control}
          defaultValue=''
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              id="confirmEmail"
              label="Confirm Email"
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'pattern'
                    ? 'Email is not valid'
                    : 'Please fill out this field'
                  : ''
              }
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? errors.password.type === 'minLength'
                    ? 'Password is required to be at least 6 characters in length'
                    : 'Please fill out this field'
                  : ''
              }
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? errors.password.type === 'minLength'
                    ? 'Password is required to be at least 6 characters in length'
                    : 'Please fill out this field'
                  : ''
              }
              {...field}
            />
          )}
        />
      </div>
      <Button type='submit' color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Register</Button>
    </form>
  )
}