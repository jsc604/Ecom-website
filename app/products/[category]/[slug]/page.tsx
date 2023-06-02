import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { Metadata } from "next";
import Product from "@/models/Product";
import db from "@/utils/db";
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string }
}

async function getData(slug: string) {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  if (!product) {
    notFound();
  }

  return product;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await JSON.parse(JSON.stringify(await getData(params.slug)));

  return {
    title: product.name,
  };
}

export default async function ProductItemPage({ params: { slug } }: PageProps) {

  const data = await JSON.parse(JSON.stringify(await getData(slug)));
  
  return (
    <div className="min-h-80vh my-12 w-3/4 mx-auto grid ml:grid-cols-2 gap-6 flex">
      <div className="relative aspect-square">
        <Image
          src={data.image}
          alt="Product image"
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>
      <div>
        <ProductInfo product={data} />
      </div>
    </div>
  )
}