'use client'
import { Checkbox, CircularProgress, FormControlLabel, List, ListItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Store } from '@/utils/StoreProvider';
import { toast } from 'react-toastify';
import { ColorButton } from '@/app/cart/EmptyBag';
import { useRouter } from 'next/navigation';
import { productObject } from '@/app/products/page';

interface PageProps {
  product: productObject;
}

export default function AdminProductsEdit({ product }: PageProps) {
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { userInfo } = useContext(Store);
  const router = useRouter();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);

  useEffect(() => {
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('brand', product.brand);
    setValue('image', product.image);
    setValue('featuredImage', product.featuredImage);
    setValue('options', product.options);
    setValue('description', product.description);
  }, []);

  const submitHandler: SubmitHandler<FieldValues> = async ({ name, category, brand, image, isFeatured, featuredImage, options, description }) => {
    setLoadingUpdate(true);
    const res = await fetch(`/api/admin/product/${product._id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, category, brand, image, isFeatured, featuredImage, options, description }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo?.token}`,
      }
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoadingUpdate(false);
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

    setLoadingUpdate(false);
    toast.success(`${data.message}`, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    router.refresh();
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
          <Controller
            name="category"
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
                id="category"
                label="Category"
                error={Boolean(errors.name)}
                helperText={errors.name ? 'Category is required' : ''}
                {...field}
              />
            )}
          ></Controller>
        </ListItem>

        <ListItem>
          <Controller
            name="brand"
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
                id="brand"
                label="Brand"
                error={Boolean(errors.name)}
                helperText={errors.name ? 'Brand is required' : ''}
                {...field}
              />
            )}
          ></Controller>
        </ListItem>

        <ListItem>
          <FormControlLabel
            label="Is Featured"
            control={
              <Checkbox
                onClick={() => setIsFeatured(!isFeatured)}
                checked={isFeatured}
                name="isFeatured"
              />
            }
          ></FormControlLabel>
        </ListItem>

        <ListItem>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                multiline
                required
                id="description"
                label="Description"
                error={Boolean(errors.name)}
                helperText={errors.name ? 'Description is required' : ''}
                {...field}
              />
            )}
          ></Controller>
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
