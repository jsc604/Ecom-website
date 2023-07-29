import FeaturedProducts from "./home/FeaturedProducts";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <FeaturedProducts products={data} />
    </main>
  );
}
