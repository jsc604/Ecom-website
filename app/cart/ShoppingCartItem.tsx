'use client'
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import { CartItems, Store } from "@/utils/StoreProvider";
import Link from "next/link";

interface PageProps {
  item: CartItems;
  optionIndex: number;
}

export default function ShoppingCartItem({ item, optionIndex }: PageProps) {
  const [newQuantity, setnewQuantity] = useState(item.quantity);
  const [newSubtotal, setNewSubtotal] = useState(item.cartItem.options[optionIndex].price * item.quantity);
  const { handleAddToCart, handleDeleteFromCart } = useContext(Store);

  const increase = () => {
    if (item.cartItem.options[optionIndex].countInStock > newQuantity) {
      setnewQuantity(newQuantity + 1);
      handleAddToCart(item.cartItem, item.optionId, 1);
    }
  };

  const decrease = () => {
    if (newQuantity > 1) {
      setnewQuantity(newQuantity - 1);
      handleAddToCart(item.cartItem, item.optionId, -1);
    }
  };

  useEffect(() => {
    setNewSubtotal(item.cartItem.options[optionIndex].price * newQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuantity]);

  return (
    <div className='grid grid-cols-12 gap-4 my-4'>

      <div className="relative aspect-square col-span-2 max-md:col-span-4 rounded-md">
        <Link href={`/products/${item.cartItem.category}/${item.cartItem.slug}`}>
          <Image
            src={item.cartItem.image}
            alt={item.cartItem.name}
            fill
            loading="lazy"
            className="object-cover rounded-md"
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </Link>
      </div>

      <div className='col-span-4 max-md:col-span-8'>
        <Box component='span' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Link href={`/products/${item.cartItem.category}/${item.cartItem.slug}`}>
            <div className='text-xl font-semibold hover:underline'>{item.cartItem.name}</div>
          </Link>
          <Button className='md:hidden' onClick={() => handleDeleteFromCart(item.optionId)}>
            <DeleteIcon sx={{ color: red[500] }} />
          </Button>
        </Box>
        <div>{item.cartItem.brand}</div>
        <div>{item.optionId}</div>
      </div>

      <div className='col-span-2 text-center max-md:col-span-4'>
        <div className='mb-2'>Item Price</div>
        <div>${(item.cartItem.options[optionIndex].price)?.toFixed(2)}</div>
      </div>

      <div className='col-span-2 text-center flex flex-col justify-between max-md:col-span-4'>
        <div>
          <div className='mb-2'>Quantity</div>
          <ButtonGroup size="small" aria-label="quantity selection button group" variant='outlined' sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={decrease} sx={{ color: grey[700], border: '1px solid #9e9e9e' }} disabled={newQuantity <= 1} >
              <RemoveIcon />
            </Button>
            <Box component="span" sx={{ padding: '6px 16px', border: '1px solid #9e9e9e' }}>
              <Typography>{newQuantity < 1 ? 0 : newQuantity}</Typography>
            </Box>
            <Button onClick={increase} sx={{ color: grey[700], border: '1px solid #9e9e9e' }} disabled={newQuantity >= item.cartItem.options[optionIndex].countInStock} >
              <AddIcon />
            </Button>
          </ButtonGroup>
        </div>
        <Button className='w-fit mx-auto hidden md:block' onClick={() => handleDeleteFromCart(item.optionId)}>
          <DeleteIcon sx={{ color: red[500] }} />
        </Button>
      </div>

      <div className='col-span-2 text-center max-md:col-span-4'>
        <div className='mb-2'>Subtotal</div>
        <div>${newSubtotal.toFixed(2)}</div>
      </div>

    </div >
  )
}
