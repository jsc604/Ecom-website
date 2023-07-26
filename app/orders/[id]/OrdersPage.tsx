'use client'
import { ItemInfo } from "@/app/cart/CartContainer";
import OrderSummary from "@/app/payment/OrderSummary";
import { ShippingInfo, Store, UserInfo } from "@/utils/StoreProvider";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface OrderPageProps {
  id: string;
}

type OrderDetails = {
  _id: string;
  user: UserInfo | null;
  orderRef: string;
  orderItems: ItemInfo[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  subtotal: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export default function OrdersPage({ id }: OrderPageProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const { userInfo } = useContext(Store);

  useEffect(() => {
    const getOrderDetails = async () => {
      let headers: { 'Content-Type': string, authorization?: string } = {
        'Content-Type': 'application/json',
      }

      if (userInfo?.token) {
        headers.authorization = `Bearer ${userInfo.token}`;
      }

      const res = await fetch(`/api/orders/${id}`, {
        method: 'GET',
        headers,
      });

      const data = await Promise.resolve(res.json());

      if (!res.ok) {
        alert('error')
        return;
      }

      setOrderDetails(data);
    }
    getOrderDetails();
  }, [id, userInfo])

  console.log(orderDetails);

  const date = orderDetails && new Date(orderDetails?.createdAt);

  return (
    <div className="mt-8">
      {orderDetails && (
        <div className="flex flex-col ml:flex-row gap-8">
          <div className="space-y-4 w-full ml:w-1/2">
            <div className="text-center">
              <div className="font-semibold text-3xl">Thanks for your order!</div>
              {userInfo && `An order confirmation has been sent to ${orderDetails.shippingInfo.email}`}
            </div>
            <Divider />
            <div className="text-xl font-semibold">Order #{orderDetails._id}</div>
            <div className="text-xl font-semibold">Reference #{orderDetails.orderRef}</div>
            <Divider />
            <div>
              <div className="font-semibold">Transaction Date</div>
              <div>{date?.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</div>
            </div>
            <Divider />
            <div>
              <div className="font-semibold">Payment Method</div>
              <div>{orderDetails.paymentMethod}</div>
            </div>
            <Divider />
            <div>
              <div className="font-semibold">Shipping Method</div>
              <div>{orderDetails.shippingInfo.shippingOption}</div>
              <Link href={'/'} className="uppercase font-semibold underline">Track order</Link>
            </div>
          </div>

          <div className="w-full ml:w-1/2">
            <OrderSummary cartItemsInfo={orderDetails.orderItems} subtotal={orderDetails.subtotal} shippingPrice={orderDetails.shippingPrice} />
          </div>
        </div>
      )}

    </div>
  )
}
