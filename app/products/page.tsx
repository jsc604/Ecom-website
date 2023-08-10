import { notFound } from "next/navigation";
import ProductItem, { ItemOptions } from "../components/ProductItem";
import { use } from "react";

export const metadata = {
  title: 'All Products - Ecom MN',
};

async function getData() {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export type productObject = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  isFeatured: boolean;
  featuredImage: string;
  options: ItemOptions[];
  brand: string;
  rating: number | undefined;
  numReviews: number;
  description: string;
};

export default function page() {
  const data = use(getData());

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-4xl">All Products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item: productObject) => (
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
    </>
  )
}
