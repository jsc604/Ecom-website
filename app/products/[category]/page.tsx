import ProductItem, { ItemOptions } from "@/app/components/ProductItem";
import Product from "@/models/Product";
import db from "@/utils/db";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { category: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.category,
  };
}

async function getData(category: string) {
  await db.connect();
  const products = await Product.find({ category }).lean();
  await db.disconnect();

  return { products };
};

export default async function ProductCategoryPage({ params: { category } }: PageProps) {

  const data = await JSON.parse(JSON.stringify(await getData(category)));

  if (!data.products.length) {
    notFound();
  };

  type productObject = {
    name: string;
    image: string;
    options: ItemOptions[];
    category: string;
    slug: string;
    rating: number;
  }

  return (
    <div className="min-h-80vh">
      <h1 className="text-center font-semibold my-8 text-3xl capitalize">{category}</h1>
      <div className="mx-auto w-4/5 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.products.map((item: productObject) => (
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
    </div>
  )
}
