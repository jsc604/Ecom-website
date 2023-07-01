'use client'

import { useContext, useEffect, useState } from 'react';
import { ItemOptions } from '@/app/components/ProductItem';
import { Divider, Rating, Typography } from '@mui/material';
import ProductSizes from './ProductSizes';
import ProductBreadcrumbs from './ProductBreadcrumbs';
import ProductCheckoutCard from './ProductCheckoutCard';
import { Store } from '@/utils/StoreProvider';
import { getCookie, setCookie } from 'cookies-next';

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    category: string;
    image: string;
    isFeatured?: boolean;
    featuredImage?: string;
    options: ItemOptions[];
    brand: string;
    rating: number;
    numReviews: number;
    description: string;
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedItem, setSelectedItem] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [itemSubtotal, setItemSubtotal] = useState(selectedItem.price);
  const { cart, handleAddToCart } = useContext(Store);

  useEffect(() => {
    setItemSubtotal(selectedItem.price * quantity);
  }, [selectedItem, quantity]);

  useEffect(() => {
    setCookie('cartItems', JSON.stringify(cart), { maxAge: 60 * 60 * 12 });
    console.log('cookie:', getCookie('cartItems'));
  }, [cart]);

  return (
    <div className='grid grid-cols-1 space-y-4'>
      <ProductBreadcrumbs category={product.category} />
      <div>
        <Typography variant='h5'>{product.brand}</Typography>
        <Typography variant='h3'>{product.name}</Typography>
        <Typography variant='h4'>
          {product.options.length > 1 ?
            `$${product.options[0].price} - $${product.options[product.options.length - 1].price}`
            :
            `$${product.options[0].price}`
          }
        </Typography>
      </div>
      <div className='flex '>
        <Rating value={product.rating} readOnly />
        <Typography variant='body1'>({product.numReviews} reviews)</Typography>
      </div>
      <Typography variant='body1'>{product.description}</Typography>
      <Divider />
      <ProductSizes
        options={product.options}
        setQuantity={setQuantity}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <ProductCheckoutCard
        itemSubtotal={itemSubtotal}
        countInStock={selectedItem.countInStock}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={() => handleAddToCart(product._id, selectedItem.size, quantity)}
      />
    </div>
  );
}
