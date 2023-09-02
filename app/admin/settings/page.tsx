'use client'

import { Store } from "@/utils/StoreProvider";
import { toastOptions } from "@/utils/toastOptions";
import { Delete, Add } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

export type Deal = {
  dealNum: number;
  image: string;
  link: string;
}

type DealForm = {
  deals: Deal[];
};

export default function Settings({ dealsData }: { dealsData: Deal[] }) {
  const { userInfo } = useContext(Store);

  const { handleSubmit, control, setValue } = useForm<DealForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deals',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue('deals', dealsData);
  }, [dealsData, setValue]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const fileInput = e.target;
    if (!fileInput) {
      return;
    }

    const file = fileInput.files && fileInput.files[0];
    if (!file) {
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

    const updatedDeals = [...fields];
    updatedDeals[index].image = `/api/upload/${file.name}`;
    setValue('deals', updatedDeals);
  };

  const handleSaveDeals = async (formData: DealForm) => {
    setLoading(true);
    const res = await fetch("/api/deals", {
      method: 'POST',
      body: JSON.stringify(formData.deals),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo?.token}`,
      }
    });

    const responseData = await res.json();

    if (!res.ok) {
      toast.error(`${responseData.message}`, toastOptions);
      setLoading(false);
      return;
    }

    toast.success(`${responseData.message}`, toastOptions);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleSaveDeals)} className="flex flex-col">
      <Typography variant="h4">Deals</Typography>
      {fields.map((deal, index) => (
        <div key={deal.id} className="flex flex-col space-y-2">
          <label>Deal {deal.dealNum}</label>
          <label>Image</label>
          <input
            type="file"
            name={`deals[${index}].image`}
            onChange={(e) => handleImageUpload(e, index)}
          />
          {deal.image && (
            <Box
              component={"div"}
              sx={{
                width: "50%",
                aspectRatio: 3 / 1,
                maxWidth: 300,
                position: "relative",
                mt: 2,
              }}
            >
              <Image
                src={deal.image}
                alt={`Deal ${index + 1}`}
                fill
                className="object-cover"
                sizes='(max-width: 689px) 50vw, 300px'
              />
            </Box>
          )}
          <Controller
            name={`deals.${index}.link`}
            control={control}
            defaultValue={deal.link}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Link to"
                placeholder={`${deal.link}`}
                required
                {...field}
              />
            )}
          />
          <IconButton onClick={() => remove(index)} color='error'>
            <Delete />
          </IconButton>
        </div>
      ))}
      {fields.length < 5 &&
        <Button
          type="button"
          onClick={() => append({ dealNum: fields.length + 1, image: '', link: '' })}
        >
          Add New Deal
          <Add />
        </Button>
      }
      <div className="flex gap-2">
        <Button type='submit' color='info' variant='contained' sx={{ width: 'fit-content' }} className='bg-info-dark'>
          Save
        </Button>
        {loading && <CircularProgress />}
      </div>
    </form>
  )
}
