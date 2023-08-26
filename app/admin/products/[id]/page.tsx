import { use } from 'react';
import AdminProductsEdit from './AdminProductsEdit'
import { getProductById } from '@/utils/fetchDataFunctions';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = use(getProductById(id));

  return (
    <>
      <div className='font-semibold text-xl'>Edit - {product.name}</div>
      <AdminProductsEdit product={product} />
    </>
  )
}
