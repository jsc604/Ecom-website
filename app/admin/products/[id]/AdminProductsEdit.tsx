'use client'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, List, ListItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Store } from '@/utils/StoreProvider';
import { toast } from 'react-toastify';
import { ColorButton } from '@/app/cart/EmptyBag';
import { useRouter } from 'next/navigation';
import { productObject } from '@/app/products/page';
import { Add, AddAPhoto, Delete } from '@mui/icons-material';
import Image from 'next/image';
import axios from 'axios';

interface PageProps {
  product: productObject;
}

export default function AdminProductsEdit({ product }: PageProps) {
  const { handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { userInfo } = useContext(Store);
  const router = useRouter();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [featuredImage, setFeaturedImage] = useState(product.featuredImage);
  const [images, setImages] = useState(product.images);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  useEffect(() => {
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('brand', product.brand);
    setValue('options', product.options);
    setValue('description', product.description);
  }, []);

  const submitHandler: SubmitHandler<FieldValues> = async ({ name, category, brand, options, description }) => {
    setLoadingUpdate(true);
    const res = await fetch(`/api/admin/products/${product._id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, category, brand, images, isFeatured, featuredImage, options, description }),
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

  const ref = useRef<HTMLInputElement>(null);

  const handleImagesUpload = async () => {
    setLoadingImages(true);
    const input = ref.current!;

    const formData = new FormData();
    const files = Array.from(input.files ?? []);
    for (const file of files) {
      formData.append(file.name, file);
    }

    await axios.post("/api/upload", formData);
    setLoadingImages(false);
    setImages(files.map((file) => `/api/upload/${file.name}`));
  };

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

        <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
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

        {/* <Box component={'div'} sx={{ display: 'flex', gap: 2, mx: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="featuredImage">Featured Image</label>
            <Button component="label" variant="contained" sx={{ width: 'fit-content' }}>
              <Box component={'span'} sx={{ display: { xs: 'none', sm: 'block' } }}>Upload File</Box>
              <AddAPhoto />
              <input
                type="file"
                id="featuredImage"
                onChange={(e) => uploadHandler(e, 'featuredImage')}
                hidden
              />
            </Button>
            {loadingUpload && <CircularProgress />}
          </Box>
          {product.featuredImage && (
            <Box component={'div'} sx={{ width: '50%', aspectRatio: 1 / 1, maxWidth: 300, position: 'relative' }}>
              <Image src={product.featuredImage} alt="Featured Image" fill className='object-cover' />
            </Box>
          )}
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, mb: 4 }}>
          <label htmlFor="featuredImages">Featured Images</label>
          <input type="file" name="featuredImages" ref={ref} multiple onChange={handleImagesUpload} />
          {loadingImages && <CircularProgress />}
          <div className="flex gap-4 mt-4 w-full">
            {images.map((image) => {
              return (
                <Image
                  key={image}
                  src={image}
                  alt={image}
                  className="object-cover aspect-square"
                  width={200}
                  height={200}
                />
              );
            })}
          </div>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, mb: 4 }}>
          <label htmlFor="images">Images</label>
          <input type="file" name="images" ref={ref} multiple onChange={handleImagesUpload} />
          {loadingImages && <CircularProgress />}
          <div className="flex gap-4 mt-4 w-full">
            {images.map((image) => {
              return (
                <Image
                  key={image}
                  src={image}
                  alt={image}
                  className="object-cover aspect-square"
                  width={100}
                  height={100}
                />
              );
            })}
          </div>
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
            {loadingUpdate ? <CircularProgress /> : 'Update'}
          </ColorButton>
        </ListItem>

      </List>
    </form >
  )
}
