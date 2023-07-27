'use client'
import { Store } from "@/utils/StoreProvider";
import { TextField, Button, CircularProgress } from "@mui/material"
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { setUserInfo } = useContext(Store);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const submitHandler: SubmitHandler<FieldValues> = async ({ email, password }) => {
    setLoading(true);
    const res = await fetch('/api/account/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.toLowerCase(), password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoading(false);
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setCookie('userInfo', data, { maxAge: 60 * 60 * 12 });
    setUserInfo(data);
    setLoading(false);
    if (pathname !== '/checkout') {
      router.push('/');
    }
    toast.success(`Welcome back ${data.name.split(' ')[0]}! 🦄`, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
          }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              required
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
              required
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
      <Button type='submit' disabled={loading} color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>
        {loading ? <CircularProgress /> : 'Log In'}
      </Button>
    </form>
  )
}