'use client'

import { useEffect, useState } from 'react';
import { ItemOptions } from '@/app/components/ProductItem';
import { Divider, Rating, Typography } from '@mui/material';
import ProductSizes from './ProductSizes';
import ProductBreadcrumbs from './ProductBreadcrumbs';
import ProductCheckoutCard from './ProductCheckoutCard';

interface ProductInfoProps {
  products: {
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

export default function ProductInfo({ products }: ProductInfoProps) {
  const [selectedItem, setSelectedItem] = useState(products.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [itemSubtotal, setItemSubtotal] = useState(selectedItem.price);

  useEffect(() => {
    setItemSubtotal(selectedItem.price * quantity);
  }, [selectedItem, quantity]);

  return (
    <div className='grid grid-cols-1 space-y-4'>
      <ProductBreadcrumbs category={products.category} />
      <div>
        <Typography variant='h5'>{products.brand}</Typography>
        <Typography variant='h3'>{products.name}</Typography>
        <Typography variant='h4'>
          {products.options.length > 1 ?
            `$${products.options[0].price} - $${products.options[products.options.length - 1].price}`
            :
            `$${products.options[0].price}`
          }
        </Typography>
      </div>
      <div className='flex '>
        <Rating value={products.rating} readOnly />
        <Typography variant='body1'>({products.numReviews} reviews)</Typography>
      </div>
      <Typography variant='body1'>{products.description}</Typography>
      <Divider />
      <ProductSizes
        options={products.options}
        setQuantity={setQuantity}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <ProductCheckoutCard
        itemSubtotal={itemSubtotal}
        setItemSubtotal={setItemSubtotal}
        countInStock={selectedItem.countInStock}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
}
