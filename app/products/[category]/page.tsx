import { productObject } from '../page';
import ProductItem from '@/app/components/ProductItem';
import { use } from 'react';
import { capitalizeWord } from '@/utils/helpers';
import { getCategoryData } from '@/utils/fetchDataFunctions';

interface PageProps {
  params: { category: string }
}
export async function generateMetadata({ params }: PageProps) {
  return {
    title: `${capitalizeWord(params.category)} - Ecom MN`,
  };
}

export default function ProductCategoryPage({ params: { category } }: PageProps) {
  const data = use(getCategoryData(category));

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-4xl capitalize">{category}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item: productObject) => (
          <ProductItem
            key={item.slug}
            name={item.name}
            image={item.featuredImage}
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
