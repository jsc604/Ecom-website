'use client'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, List, ListItem, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Store } from '@/utils/StoreProvider';
import { toast } from 'react-toastify';
import { ColorButton } from '@/app/cart/EmptyBag';
import { useRouter } from 'next/navigation';
import { Add, Delete } from '@mui/icons-material';
import Image from 'next/image';
import axios from 'axios';
import { toastOptions } from '@/utils/toastOptions';

export default function AdminProductsAdd() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { userInfo } = useContext(Store);
  const router = useRouter();

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingFeaturedImage, setLoadingFeaturedImage] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string>();
  const [images, setImages] = useState<string[]>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const submitHandler: SubmitHandler<FieldValues> = async ({ name, category, brand, options, description }) => {
    setLoadingAdd(true);
    const res = await fetch(`/api/admin/products`, {
      method: 'POST',
      body: JSON.stringify({ name, category, brand, images, isFeatured, featuredImage, options, description }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo?.token}`,
      }
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setLoadingAdd(false);
      toast.error(`${data.message}`, toastOptions);
      return;
    }

    setLoadingAdd(false);
    toast.success(`${data.message}`, toastOptions);
    router.push('/admin/products');
  }

  const handleFeaturedImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoadingFeaturedImage(true);

    const fileInput = e.target;
    if (!fileInput) {
      setLoadingFeaturedImage(false);
      return;
    }

    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      setLoadingFeaturedImage(false);
      return;
    }

    const formData = new FormData();
    formData.append(file.name, file);

    await axios.post("/api/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userInfo?.token}`,
      },
    });

    setFeaturedImage(`/api/upload/${file.name}`);

    setLoadingFeaturedImage(false);
  };

  const handleImagesUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoadingImages(true);

    const formData = new FormData();
    const files = Array.from(e.target.files ?? []);

    if (files.length > 5) {
      setLoadingAdd(false);
      toast.error(`Maximum of 5 photos allowed`, toastOptions);
      return;
    }

    for (const file of files) {
      formData.append(file.name, file);
    }

    await axios.post("/api/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userInfo?.token}`,
      },
    });
    setImages(files.map((file) => `/api/upload/${file.name}`));
    setLoadingImages(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Typography component={'h1'} variant='h4'>Add new product</Typography>
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

        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2 }}>
          <label className='underline'>Options</label>
          <List>
            {fields.map((option, index) => (
              <ListItem key={option.id} sx={{ gap: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                  name={`options[${index}].size`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Size"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`options[${index}].price`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Price"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`options[${index}].countInStock`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Count in Stock"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <IconButton onClick={() => remove(index)} color='error'>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
            <Button
              type="button"
              onClick={() => append({ size: '', price: '', countInStock: '' })}
            >
              Add Option
              <Add />
            </Button>
          </List>
        </Box>

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

        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, mb: 4 }}>
          <label htmlFor="featuredImage">Featured Image</label>
          <input type="file" name="featuredImage" onChange={handleFeaturedImageUpload} />
          {loadingFeaturedImage && <CircularProgress />}
          {featuredImage &&
            <Box component={'div'} sx={{ width: '50%', aspectRatio: 1 / 1, maxWidth: 300, position: 'relative', mt: 2 }}>
              <Image src={featuredImage} alt="Featured Image" fill className='object-cover' sizes='(max-width: 689px) 50vw, 300px' />
            </Box>
          }
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, mb: 4 }}>
          <label htmlFor="images">Images (up to 5)</label>
          <input type="file" name="images" multiple onChange={handleImagesUpload} />
          {loadingImages && <CircularProgress />}

          {images &&
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {images.map((image) => {
                return (
                  <Box
                    key={image}
                    component={'div'}
                    sx={{ width: '50%', aspectRatio: 1 / 1, maxWidth: 150, position: 'relative', mt: 2 }}
                  >
                    <Image src={image} alt={image} fill className='object-cover' sizes='(max-width: 923px) 20vw, 150px' />
                  </Box>
                );
              })}
            </Box>
          }
        </Box>

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
          />
        </ListItem>

        <ListItem>
          <ColorButton
            type="submit"
          >
            {loadingAdd ? <CircularProgress /> : 'Update'}
          </ColorButton>
        </ListItem>

      </List>
    </form >
  )
}
