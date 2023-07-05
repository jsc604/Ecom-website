'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'
import { notFound } from 'next/navigation';
import { ItemOptions } from '@/app/components/ProductItem';

interface PageProps {
  category: string;
  slug: string;
}

export interface ProductInfoProps {
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

export default function ProductContainer({ category, slug }: PageProps) {
  const [productData, setProductData] = useState<ProductInfoProps>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/category/${category}/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch category products');
        }
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [category, slug]);

  if (error) {
    notFound();
  }

  return (
    <div>
      {productData !== undefined ? (
        <div className="min-h-80vh my-12 w-4/5 mx-auto grid ml:grid-cols-2 gap-6 flex">
          <div className="relative aspect-square">
            <Image
              src={productData.image}
              alt="Product image"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
          </div>
          <div>
            <ProductInfo product={productData} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
