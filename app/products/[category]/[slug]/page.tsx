import NotFound from "@/app/components/NotFound";
import { data } from "@/utils/data";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const products = data.products.find((item) => item.slug === params.slug);

  return {
    title: products?.name,
  };
}

export default function ProductItemPage({ params: { slug } }: PageProps) {

  const products = data.products.find((item) => item.slug === slug);

  if (!products) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="min-h-80vh my-12 w-3/4 mx-auto grid ml:grid-cols-2 gap-6 flex">
      <div className="relative aspect-square">
        <Image
          src={products.image}
          alt="Product image"
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </div>
      <div>
        <ProductInfo products={products} />
      </div>
    </div>
  )
}