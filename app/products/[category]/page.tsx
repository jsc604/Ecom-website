import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productObject } from '../page';
import ProductItem from '@/app/components/ProductItem';

interface PageProps {
  params: { category: string }
}

export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${capitalizeWord(params.category)} - Ecom MN`,
  };
}

async function getCategoryData(category: string) {
  const res = await fetch(`http://localhost:3000/api/products/category/${category}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductCategoryPage({ params: { category } }: PageProps) {
  const data = await getCategoryData(category);

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-4xl capitalize">{category}</h1>
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
