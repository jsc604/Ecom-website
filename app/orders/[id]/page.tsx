import React from 'react'
import OrdersPage from './OrdersPage';

interface PageProps {
  params: { id: string };
}

export default function Orders({ params: { id } }: PageProps) {

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <OrdersPage id={id} />
    </div>
  )
}
