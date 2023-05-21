import NotFound from "@/app/components/NotFound";
import ProductItem from "@/app/components/ProductItem";
import { data } from "@/utils/data";
import { Metadata } from 'next';

interface PageProps {
  params: { category: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.category,
  };
}

export default function ProductCategoryPage({ params: { category } }: PageProps) {

  const products = data.products.filter((item) => item.category === category);

  if (!products.length) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="min-h-80vh">
      <h1 className="text-center font-semibold my-8 text-3xl capitalize">{category}</h1>
      <div className="mx-auto w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
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
    </div>
  )
}
