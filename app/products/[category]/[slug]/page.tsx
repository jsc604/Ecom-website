import { notFound } from "next/navigation";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { use } from "react";

interface PageProps {
  params: { slug: string, category: string }
}

export async function generateMetadata({ params }: PageProps) {

  const { slug } = params;
  const fixedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${fixedName} - Ecom MN`,
  };
}

async function getProductData(category: string, slug: string) {
  const res = await fetch(`http://localhost:3000/api/products/category/${category}/${slug}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default function ProductItemPage({ params: { slug, category } }: PageProps) {
  const productData = use(getProductData(category, slug));

  return (
    <div className="min-h-80vh my-12 grid ml:grid-cols-2 gap-6 flex">
      <div className="relative aspect-square">
        <Image
          src={productData.featuredImage}
          alt="Product image"
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>
      <div>
        <ProductInfo product={productData} />
      </div>
    </div>
  )
}