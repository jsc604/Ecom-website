import React from 'react'
import OrdersPage from './OrdersPage';

interface PageProps {
  params: { id: string };
}

export default function Orders({ params: { id } }: PageProps) {

  return (
    <>
      <OrdersPage id={id} />
    </>
  )
}
