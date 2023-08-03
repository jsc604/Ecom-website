'use client'
import { ColorButton } from "@/app/cart/EmptyBag";
import { OrderDetails } from "@/app/orders/[id]/page";
import { Store } from "@/utils/StoreProvider";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from "@mui/material"
import { blue } from "@mui/material/colors";
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import LoadingSkeleton from "./LoadingSkeletion";

export default function AdminOrders() {
  const { userInfo } = useContext(Store);
  const [orders, setOrders] = useState<OrderDetails[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const fetchOrderHistory = async () => {
        setLoading(true);
        const res = await fetch(`/api/admin/orders`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await Promise.resolve(res.json());

        if (!res.ok) {
          alert(data.message);
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
      <Typography component={'h1'} variant='h4'>Orders</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>REF</TableCell>
              <TableCell>MAKER</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell>DELIVERED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                        {`${order._id.substring(0, 4)}...${order._id.substring(20, 24)}`}
                      </Link>
                    </TableCell>
                    <TableCell >
                      {order.orderRef}
                    </TableCell>
                    <TableCell>
                      {order.user ? (
                        <Link href={`/orders/${order._id}`} className="text-[#1565c0] underline">
                          {`${order.user.substring(0, 4)}...${order.user.substring(20, 24)}`}
                        </Link>
                      ) : (
                        'null'
                      )}
                    </TableCell>
                    <TableCell>{date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box component='div'>
                        {order.isPaid
                          ? `paid`
                          : 'processing'}
                      </Box>
                      <ColorButton>Paid</ColorButton>
                    </TableCell>
                    <TableCell>
                      <Box component='div'>
                        {order.isDelivered
                          ? `delivered`
                          : 'processing'}
                      </Box>
                      <ColorButton>Delivered</ColorButton>
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
