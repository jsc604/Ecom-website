'use client'
import { useEffect, useState } from 'react';
import ProductItem, { ItemOptions } from '../components/ProductItem';
import { notFound } from 'next/navigation';

export type productObject = {
  _id: string;
  slug: string;
  name: string;
  image: string;
  options: ItemOptions[];
  category: string;
  rating: number | undefined;
};

export default function AllProducts() {
  const [productData, setProductData] = useState<productObject[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, []);

  if (error) {
    notFound();
  }

  return (
    <>
      {productData?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.map((item: productObject) => (
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
