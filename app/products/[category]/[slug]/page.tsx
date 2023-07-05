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
    <div>
      <ProductContainer category={category} slug={slug} />
    </div>
  )
}