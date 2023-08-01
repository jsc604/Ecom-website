'use client'
import { ColorButton } from '@/app/cart/EmptyBag';
import { Store } from '@/utils/StoreProvider';
import { TextField, Typography } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Profile() {
  const { userInfo, setUserInfo } = useContext(Store);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const submitHandler: SubmitHandler<FieldValues> = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
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

    const res = await fetch(`/api/account/profile`, {
      method: 'PUT',
      body: JSON.stringify({ name, email: email.toLowerCase(), password }),
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
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
    toast.success(`Profile updated successfully! 🦄`, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <Typography component={'h1'} variant='h4'>Update Profile</Typography>
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col pb-8 pl-8 pr-8 pt-2'>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field }) => (
            <TextField className='col-span-4'
              sx={{ marginTop: 2 }}
              id="name"
              label="Name"
              inputProps={{ type: 'name' }}
              error={Boolean(errors.name)}
              helperText={
                errors.name
                  ? errors.name.type === 'minLength'
                    ? 'Name length is more than 1'
                    : 'Name is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
          }}
          render={({ field }) => (
            <TextField
              sx={{ marginTop: 2 }}
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'pattern'
                    ? 'Email is not valid'
                    : 'Email is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              value === '' ||
              value.length > 5 ||
              'Password length has to be more than 5',
          }}
          render={({ field }) => (
            <TextField
              sx={{ marginTop: 2 }}
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? 'Password length has to be more than 5'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              value === '' ||
              value.length > 5 ||
              'Confirm Password length has to be more than 5',
          }}
          render={({ field }) => (
            <TextField
              sx={{ marginTop: 2 }}
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.password
                  ? 'Confirm Password length has to be more than 5'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        />

        <ColorButton
          variant="contained"
          type="submit"
          sx={{ marginTop: 2 }}
          color="secondary"
        >
          Update
        </ColorButton>

      </form>

    </>
  );
}
