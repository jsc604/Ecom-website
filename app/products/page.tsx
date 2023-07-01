import ProductItem, { ItemOptions } from "../components/ProductItem";
import db from "@/utils/db";
import Product from "@/models/Product";

export const metadata = {
  title: 'All Products',
  description: 'all products',
};

async function getData() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return { products };
};

export type productObject = {
  _id: string;
  slug: string;
  name: string;
  image: string;
  options: ItemOptions[];
  category: string;
  rating: number | undefined;
};

export default async function Products() {
  const data = await JSON.parse(JSON.stringify(await getData()));

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-3xl">All Products</h1>
      <div className="mx-auto w-4/5 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.products.map((item: productObject) => (
          <ProductItem
            key={item.slug}
            slug={item.slug}
            name={item.name}
            image={item.image}
            options={item.options}
            category={item.category}
            rating={item.rating}
          />
        ))}
      </div>
    </>
  )
}
