import { notFound } from "next/navigation";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { Key, use } from "react";
import ImageCarousel from "./ImageCarousel";

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
  const images = [productData.featuredImage, ...productData.images];

  const indicatorIcons = images.map((image, i) => (
    <div key={i} className="aspect-square w-[40px] h-auto relative mx-1">
      <Image src={image} alt={image} fill className="object-cover" />
    </div>
  ))

  return (
    <div className="min-h-80vh my-12 grid ml:grid-cols-2 gap-6 flex">
      <ImageCarousel images={images} indicatorIcons={indicatorIcons} />
      <ProductInfo product={productData} />
    </div>
  )
}