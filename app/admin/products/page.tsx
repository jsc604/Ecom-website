import { use } from 'react';
import AdminProducts from './AdminProducts'
import { getProducts } from '@/utils/fetchDataFunctions';

export default function page() {
  const products = use(getProducts());

  return (
    <AdminProducts products={products} />
  )
}
