'use client'

import { useContext, useEffect, useState } from "react";
import StoreStats from "./StoreStats";
import { Store } from "@/utils/StoreProvider";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

type stats = {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  ordersPrice: number;
}

export default function AdminDashboard() {
  const { userInfo } = useContext(Store);
  const [statsSummary, setStatsSummary] = useState<stats>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      const fetchStoreSummary = async () => {
        const res = await fetch('/api/admin/dashboard', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await Promise.resolve(res.json());

        if (!res.ok) {
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          return;
        }

        setStatsSummary(data);
        setLoading(false);
      }
      fetchStoreSummary();
    }
  }, [userInfo])

  return (
    <>
      <div className="gap-4 sm:gap-6 w-full grid grid-cols-2 md:grid-cols-4">
        {loading ? (
          <>
            <Skeleton height={200} sx={{ mt: -5, mb: -5 }} />
            <Skeleton height={200} sx={{ mt: -5, mb: -5 }} />
            <Skeleton height={200} sx={{ mt: -5, mb: -5 }} />
            <Skeleton height={200} sx={{ mt: -5, mb: -5 }} />
          </>
        ) : (
          <>
            <StoreStats category="Sales" data={statsSummary ? statsSummary.ordersPrice : '--'} />
            <StoreStats category="Orders" data={statsSummary ? statsSummary.ordersCount : '--'} />
            <StoreStats category="Products" data={statsSummary ? statsSummary.productsCount : '--'} />
            <StoreStats category="Users" data={statsSummary ? statsSummary.usersCount : '--'} />
          </>
        )}
      </div>
    </>
  )
}
