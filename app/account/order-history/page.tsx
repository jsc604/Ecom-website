'use client'
import { OrderDetails } from "@/app/orders/[id]/page";
import { Store } from "@/utils/StoreProvider";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonProps, styled } from "@mui/material"
import { blue, purple } from "@mui/material/colors";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import LoadingSkeleton from "./LoadingSkeleton";

export default function OrderHistory() {
  const { userInfo } = useContext(Store);
  const [orders, setOrders] = useState<OrderDetails[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      const fetchOrderHistory = async () => {
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
          return;
        }

        setOrders(data);
        setLoading(false);
      }
      fetchOrderHistory();
    }
  }, [userInfo])

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));

  return (
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
            <>
              {errorMessage}
              <ColorButton onClick={() => router.push('/login')}>Log in</ColorButton>
            </>
          }
          {errorMessage === "Sorry, no orders found!" &&
            <>
              {errorMessage}
              <ColorButton onClick={() => router.push('/products')}>Log in</ColorButton>
            </>
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
  )
}
