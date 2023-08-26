'use client'
import { Checkbox, CircularProgress, FormControlLabel, List, ListItem, Skeleton, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Store, UserInfo } from '@/utils/StoreProvider';
import { toast } from 'react-toastify';
import { ColorButton } from '@/app/cart/EmptyBag';
import { useRouter } from 'next/navigation';
import { toastOptions } from '@/utils/toastOptions';

export default function AdminEdit({ params }: { params: { id: string } }) {
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { userInfo } = useContext(Store);
  const { id } = params;
  const router = useRouter();

  const [fetchedUser, setFetchedUser] = useState<UserInfo>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const fetchUser = async () => {
    setLoadingFetch(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoadingFetch(false);
      toast.error(`${data.message}`, toastOptions);
      return;
    }

    setFetchedUser(data);
    setLoadingFetch(false);
  }

  useEffect(() => {
    if (userInfo) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (fetchedUser) {
      setValue('name', fetchedUser?.name);
      setValue('isAdmin', fetchedUser?.isAdmin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedUser]);

  const submitHandler: SubmitHandler<FieldValues> = async ({ name }) => {
    setLoadingUpdate(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, isAdmin }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo?.token}`,
      }
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoadingUpdate(false);
      toast.error(`${data.message}`, toastOptions);
      return;
    }

    setLoadingUpdate(false);
    toast.success(`${data.message}`, toastOptions);
    router.refresh();
  }

  if (loadingFetch) {
    return (
      <>
        <Skeleton width="40%" height={50} />
        <Skeleton width="30%" height={50} />
        <Skeleton width="20%" height={50} />
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <List>
        <ListItem>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                required
                id="name"
                label="Name"
                error={Boolean(errors.name)}
                helperText={errors.name ? 'Name is required' : ''}
                {...field}
              />
            )}
          ></Controller>
        </ListItem>
        <ListItem>
          <FormControlLabel
            label="Is Admin"
            control={
              <Checkbox
                onClick={() => setIsAdmin(!isAdmin)}
                checked={isAdmin}
                name="isAdmin"
              />
            }
          ></FormControlLabel>
        </ListItem>
        <ListItem>
          <ColorButton
            type="submit"
          >
            {loadingUpdate ? <CircularProgress /> : 'Update'}
          </ColorButton>
        </ListItem>
      </List>
    </form>
  )
}
