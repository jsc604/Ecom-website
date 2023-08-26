'use client'
import OrderSummary from "@/app/payment/OrderSummary";
import { ShippingInfo, Store } from "@/utils/StoreProvider";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Error from "./error";
import { ItemInfo } from "@/app/cart/page";
import { ColorButton } from "@/app/cart/EmptyBag";

export type OrderDetails = {
  _id: string;
  user: string | null;
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

export default function OrdersPage({ params: { id } }: { params: { id: string } }) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  const { userInfo } = useContext(Store);
  const [errorMessage, setErrorMessage] = useState();

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
      setErrorMessage(data.message);
      return;
    }

    setOrderDetails(data);
  }

  useEffect(() => {
    getOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userInfo])

  const date = orderDetails && new Date(orderDetails?.createdAt);

  const handleDelivery = async (id: string) => {
    const res = await fetch(`/api/admin/orders/deliver`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      alert(data.message);
      return;
    }
    getOrderDetails();
  }

  return (
    <div className="mt-8">
      {orderDetails && (
        <div className="flex flex-col ml:flex-row gap-8">
          <div className="space-y-4 w-full ml:w-1/2">
            <div className="text-center">
              <div className="font-semibold text-3xl">Thanks for your order!</div>
              {userInfo && userInfo._id === orderDetails.user &&
                `An order confirmation has been sent to ${orderDetails.shippingInfo.email}`
              }
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
              {userInfo?.isAdmin && <div>Status: {orderDetails.isPaid ? 'PAID' : 'PROCESSING'}</div>}
            </div>
            <Divider />
            <div>
              <div className="font-semibold">Shipping Method</div>
              {userInfo?.isAdmin || (userInfo?._id === orderDetails.user) ? (
                <>
                  <div>{orderDetails.shippingInfo.name}</div>
                  <div>{orderDetails.shippingInfo.address}</div>
                  <div>{orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.province}, Canada, {orderDetails.shippingInfo.postalCode}</div>
                </>
              ) : (
                <></>
              )}
              <div>{orderDetails.shippingInfo.shippingOption}</div>
              {userInfo?.isAdmin || (userInfo?._id === orderDetails.user) ? (
                <>
                  {orderDetails.isDelivered ? (
                    <Link href={'/'} className="uppercase font-semibold underline">Track order</Link>
                  ) : (
                    <div className="font-semibold">Order processing. No tracking available yet.</div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {userInfo?.isAdmin && (
              <ColorButton
                onClick={() => handleDelivery(orderDetails._id)}
                disabled={orderDetails.isDelivered}
              >
                Delivered
              </ColorButton>
            )}
          </div>

          <div className="w-full ml:w-1/2">
            <OrderSummary cartItemsInfo={orderDetails.orderItems} subtotal={orderDetails.subtotal} shippingPrice={orderDetails.shippingPrice} />
          </div>
        </div>
      )}
      {!orderDetails && errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
