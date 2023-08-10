import { use } from 'react';
import AdminProductsEdit from './AdminProductsEdit'

async function fetchProducts(id: string) {
  return fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json());
}

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = use(fetchProducts(id));

  return (
    <AdminProductsEdit product={product} />
  )
}
