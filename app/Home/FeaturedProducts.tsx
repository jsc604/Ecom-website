import ProductItem from "../components/ProductItem";
import { productObject } from '../products/page';

interface PageProps {
  products: productObject[];
}

export default function FeaturedProducts({ products }: PageProps) {

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-3xl">Featured Products</h1>
      <div className="mx-auto w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item: productObject) => (
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
    </>
  )
}