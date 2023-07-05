'use client'
import ProductItem from '@/app/components/ProductItem'
import React, { useEffect, useState } from 'react'
import { productObject } from '../AllProducts'
import { notFound } from 'next/navigation';

interface PageProps {
  category: string;
}

export default function CategoryProducts({ category }: PageProps) {
  const [categoryProductData, setCategoryProductData] = useState<productObject[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/category/${category}`);
        if (!res.ok) {
          throw new Error('Failed to fetch category products');
        }
        const data = await res.json();
        setCategoryProductData(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [category]);

  if (error) {
    notFound();
  }

  return (
    <>
      {categoryProductData?.length ? (
        <div className="mx-auto w-4/5 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProductData.map((item: productObject) => (
            <ProductItem
              key={item.slug}
              name={item.name}
              image={item.image}
              options={item.options}
              category={item.category}
              slug={item.slug}
              rating={item.rating}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
