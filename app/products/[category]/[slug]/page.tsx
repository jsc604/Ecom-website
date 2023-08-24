import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { use } from "react";
import ImageCarousel from "./ImageCarousel";
import { getProductData } from "@/utils/fetchDataFunctions";

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

export default function ProductItemPage({ params: { slug, category } }: PageProps) {
  const productData = use(getProductData(category, slug));
  
  const images = [productData.featuredImage, ...productData.images];

  const indicatorIcons = images.map((image, i) => (
    <div key={i} className="aspect-square w-[40px] h-auto relative mx-1">
      <Image src={image} alt={image} fill className="object-cover" sizes="40px" />
    </div>
  ))

  return (
    <div className="min-h-80vh my-12 grid ml:grid-cols-2 gap-6 flex">
      <ImageCarousel images={images} indicatorIcons={indicatorIcons} />
      <ProductInfo product={productData} />
    </div>
  )
}