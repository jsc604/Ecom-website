'use client'

import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import { Store } from "@/utils/StoreProvider";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";

interface PageProps {
  image: string;
  id: string;
  slug: string;
  category: string;
  name: string;
  size: string;
  price: number;
  subtotal: number;
  quantity: number;
  countInStock: number;
}

export default function CartItem({ image, id, category, slug, name, size, price, subtotal, quantity, countInStock }: PageProps) {
  const [newQuantity, setnewQuantity] = useState(quantity);
  const [newSubtotal, setNewSubtotal] = useState(subtotal);
  const { cart, handleAddToCart, handleDeleteFromCart } = useContext(Store);

  const increase = () => {
    if (countInStock > newQuantity) {
      setnewQuantity(newQuantity + 1);
      handleAddToCart(id, size, 1);
    }
  };

  const decrease = () => {
    if (newQuantity > 1) {
      setnewQuantity(newQuantity - 1);
      handleAddToCart(id, size, -1);
    }
  };

  useEffect(() => {
    setNewSubtotal(price * newQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuantity]);

  useEffect(() => {
    setCookie('cartItems', JSON.stringify(cart), { maxAge: 60 * 60 * 12 });
    console.log('cookie:', getCookie('cartItems'));
  }, [cart]);

  return (
    <div className='grid grid-cols-12 gap-4 my-4'>
      <div className="relative aspect-square col-span-2 rounded-md">
        <Link href={`/products/${category}/${slug}`}>
          <Image
            src={image}
            alt={name}
            fill
            loading="lazy"
            className="object-cover rounded-md"
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </Link>
      </div>
      <div className='col-span-4'>
        <Link href={`/products/${category}/${slug}`}>
          <div className='text-xl font-bold hover:underline'>{name}</div>
        </Link>
        <div>{size}</div>
      </div>
      <div className='col-span-2 text-center'>
        <div className='mb-2'>Item Price</div>
        <div>${(price).toFixed(2)}</div>
      </div>
      <div className='col-span-2 text-center flex flex-col justify-between'>
        <div>
          <div className='mb-2'>Quantity</div>
          <ButtonGroup size="small" aria-label="quantity selection button group" variant='outlined'>
            <Button onClick={decrease} sx={{ color: grey[700], border: '1px solid #9e9e9e' }} disabled={newQuantity <= 1} >
              <RemoveIcon />
            </Button>
            <Box component="span" sx={{ padding: '6px 16px', border: '1px solid #9e9e9e' }}>
              <Typography>{newQuantity < 1 ? 0 : newQuantity}</Typography>
            </Box>
            <Button onClick={increase} sx={{ color: grey[700], border: '1px solid #9e9e9e' }} disabled={newQuantity >= countInStock} >
              <AddIcon />
            </Button>
          </ButtonGroup>
        </div>
        <Button className='w-fit mx-auto' onClick={() => handleDeleteFromCart(size)}>
          <DeleteIcon sx={{ color: red[500] }} />
        </Button>
      </div>
      <div className='col-span-2 text-center'>
        <div className='mb-2'>Subtotal</div>
        <div>${newSubtotal.toFixed(2)}</div>
      </div>
    </div >
  )
}
