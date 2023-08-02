'use client'

import { useContext, useEffect, useState } from "react";
import StoreStats from "./StoreStats";
import { Store } from "@/utils/StoreProvider";

type stats = {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  ordersPrice: number;
}

export default function AdminDashboard() {
  const { userInfo } = useContext(Store);
  const [statsSummary, setStatsSummary] = useState<stats>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      const fetchStoreSummary = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/dashboard', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await Promise.resolve(res.json());

        if (!res.ok) {
          setErrorMessage(data.message);
          setLoading(false);
          return;
        }

        setStatsSummary(data);
        setLoading(false);
      }
      fetchStoreSummary();
    }
  }, [userInfo])

  console.log('statsSummary: ', (statsSummary));

  return (
    <>
      <div className="gap-4 sm:gap-6 w-full grid grid-cols-2 md:grid-cols-4">
        <StoreStats category="Sales" data={statsSummary ? statsSummary.ordersPrice : '--'} />
        <StoreStats category="Orders" data={statsSummary ? statsSummary.ordersCount : '--'} />
        <StoreStats category="Products" data={statsSummary ? statsSummary.productsCount : '--'} />
        <StoreStats category="Users" data={statsSummary ? statsSummary.usersCount : '--'} />
      </div>
    </>
  )
}
