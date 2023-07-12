'use client'
import { Store } from "@/utils/StoreProvider";
import { TextField, Button } from "@mui/material"
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { setUserInfo } = useContext(Store);

  const pathname = usePathname();
  const router = useRouter();

  const submitHandler: SubmitHandler<FieldValues> = async ({ email, password }) => {
    const res = await fetch('/api/account/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      toast.error(`'🦄 Wow so easy!'`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setCookie('userInfo', data, { maxAge: 60 * 60 * 12 });
    setUserInfo(data);
    if (pathname !== '/checkout') {
      router.push('/');
    }
    console.log('user-cookie: ', JSON.parse(getCookie('userInfo') as string));
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} method="POST">
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 my-2">
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
      </div>
      <Button type='submit' color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Log In</Button>
    </form>
  )
}