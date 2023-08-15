import { use } from 'react';
import AdminProductsEdit from './AdminProductsEdit'
import ImageUploader from '../ImageUpload';

async function fetchProducts(id: string) {
  return fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json());
}

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = use(fetchProducts(id));

  return (
    <>
      <div className='font-semibold text-xl'>Edit - {product.name}</div>
      {/* <AdminProductsEdit product={product} /> */}
      <ImageUploader />
    </>
  )
}
