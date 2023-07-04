import AllProducts from "./AllProducts";

export const metadata = {
  title: 'All Products',
  description: 'all products',
};

export default async function Products() {

  return (
    <>
      <h1 className="text-center font-semibold my-8 text-3xl">All Products</h1>
      <AllProducts />
    </>
  )
}
