'use client'
import { OrderDetails } from "@/app/orders/[id]/page";
import { Store } from "@/utils/StoreProvider";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material"
import { blue } from "@mui/material/colors";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import LoadingSkeleton from "./LoadingSkeleton";
import { ColorButton } from "@/app/cart/EmptyBag";

export default function OrderHistory() {
  const { userInfo } = useContext(Store);
  const [orders, setOrders] = useState<OrderDetails[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      const fetchOrderHistory = async () => {
        setErrorMessage('');
        setLoading(true);
        const res = await fetch(`/api/orders`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await Promise.resolve(res.json());

        if (!res.ok) {
          setErrorMessage(data.message);
          setLoading(false);
          return;
        }

        setOrders(data);
        setLoading(false);
      }
      fetchOrderHistory();
    }
  }, [userInfo])

  return (
    <>
      <Typography component={'h1'} variant='h4'>Your Orders</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell>DELIVERED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errorMessage === "Please log in to view your order history!" &&
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-2xl mb-4">{errorMessage}</div>
                  <ColorButton onClick={() => router.push('/login')}>Log in</ColorButton>
                </TableCell>
              </TableRow>
            }
            {errorMessage === "Sorry, no orders found!" &&
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-2xl mb-4">{errorMessage}</div>
                  <ColorButton onClick={() => router.push('/products')}>Shop now</ColorButton>
                </TableCell>
              </TableRow>
            }
            {loading ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : (
              orders && orders.map((order: OrderDetails) => {
                const date = new Date(order.createdAt);
                return (
                  <TableRow key={order._id}>
                    <TableCell sx={{ color: blue[800], textDecoration: 'underline' }}>
                      <Link href={`/orders/${order._id}`}>
                        {order._id.substring(20, 24)}
                      </Link>
                    </TableCell>
                    <TableCell>{date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.isPaid
                        ? `paid`
                        : 'processing'}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered
                        ? `delivered`
                        : 'processing'}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
