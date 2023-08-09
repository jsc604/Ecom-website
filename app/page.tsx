import { use } from "react";
import FeaturedProducts from "./home/FeaturedProducts";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default function Home() {
  const data = use(getData());

  return (
    <>
      <FeaturedProducts products={data} />
    </>
  );
}
