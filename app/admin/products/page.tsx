import { use } from 'react';
import AdminProducts from './AdminProducts'

async function fetchProducts() {
  return fetch(`http://localhost:3000/api/products`).then(res => res.json());
}

export default function page() {
  const products = use(fetchProducts());

  return (
    <AdminProducts products={products} />
  )
}
