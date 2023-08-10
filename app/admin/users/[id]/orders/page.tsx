'use client'
import { ColorButton } from "@/app/cart/EmptyBag";
import { OrderDetails } from "@/app/orders/[id]/page";
import { Store } from "@/utils/StoreProvider";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { blue } from "@mui/material/colors";
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import LoadingSkeleton from "./LoadingSkeletion";

interface PageProps {
  params: { id: string };
}

export default function UserOrders({ params }: PageProps) {
  const { id } = params;
  const { userInfo } = useContext(Store);
  const [orders, setOrders] = useState<OrderDetails[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrderHistory = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    if (userInfo) {
      fetchOrderHistory();
    }
  }, [userInfo])

  const handlePayment = async (id: string) => {
    const res = await fetch(`/api/admin/orders/pay`, {
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

    fetchOrderHistory();
  }

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

    fetchOrderHistory();
  }
  
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>REF</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>TOTAL</TableCell>
            <TableCell>PAID</TableCell>
            <TableCell>DELIVERED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading || !userInfo ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            orders ? (orders.map((order: OrderDetails) => {
              const date = new Date(order.createdAt);
              return (
                <TableRow key={order._id}>
                  <TableCell sx={{ color: blue[800], textDecoration: 'underline' }}>
                    <Link href={`/orders/${order._id}`}>
                      {`${order._id.substring(0, 4)}...${order._id.substring(20, 24)}`}
                    </Link>
                  </TableCell>
                  <TableCell >
                    {order.orderRef}
                  </TableCell>
                  <TableCell>{date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box component='div'>
                      {order.isPaid
                        ? `Complete`
                        : 'Processing'}
                    </Box>
                    <ColorButton onClick={() => handlePayment(order._id)}>{order.isPaid ? 'Undo' : 'Paid'}</ColorButton>
                  </TableCell>
                  <TableCell>
                    <Box component='div'>
                      {order.isDelivered
                        ? `Complete`
                        : 'Processing'}
                    </Box>
                    <ColorButton onClick={() => handleDelivery(order._id)}>{order.isDelivered ? 'Undo' : 'Delivered'}</ColorButton>
                  </TableCell>
                </TableRow>
              )
            })) : (
              <>{error}</>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
