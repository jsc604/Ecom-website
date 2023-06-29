import FeaturedProducts from "./Home/FeaturedProducts";
import Product from '@/models/Product';

import db from '@/utils/db';

async function getData() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return { products };
};

export default async function Home() {
  const data = await JSON.parse(JSON.stringify(await getData()));

  return (
    <main className="min-h-80vh">
      <FeaturedProducts products={data.products} />
    </main>
  );
}
