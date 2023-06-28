import Product from '@/models/Product';
import ProductItem from "../components/ProductItem";
import { productObject } from '../products/page';
import db from '@/utils/db';

async function getData() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return { products };
};

export default async function FeaturedProducts() {
  const data = await JSON.parse(JSON.stringify(await getData()));

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-3xl">Featured Products</h1>
      <div className="mx-auto w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  )
}