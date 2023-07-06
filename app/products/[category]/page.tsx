import { Metadata } from 'next';
import CategoryProducts from "./CategoryProducts";

interface PageProps {
  params: { category: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.category,
  };
}

export default async function ProductCategoryPage({ params: { category } }: PageProps) {

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-semibold my-8 text-4xl capitalize">{category}</h1>
      <CategoryProducts category={category} />
    </div>
  )
}
