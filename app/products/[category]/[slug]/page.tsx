import ProductContainer from "./ProductContainer";

interface PageProps {
  params: { slug: string, category: string }
}

export async function generateMetadata({ params }: PageProps) {

  const { slug } = params;
  const fixedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: fixedName,
  };
}

export default async function ProductItemPage({ params: { slug, category } }: PageProps) {

  return (
    <div className="min-h-[80vh] w-11/12 max-w-[1350px] mx-auto">
      <ProductContainer category={category} slug={slug} />
    </div>
  )
}