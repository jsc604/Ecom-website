'use client'
import { ColorButton } from "@/app/cart/EmptyBag";
import { Store, UserInfo } from "@/utils/StoreProvider";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import LoadingSkeleton from "./LoadingSkeletion";
import { toast } from "react-toastify";
import { blue } from "@mui/material/colors";
import { OrderCounts } from "@/app/api/admin/users/route";

export interface userProps {
  users: UserInfo[];
  orderCounts: OrderCounts;
}

export default function AdminOrders() {
  const { userInfo } = useContext(Store);
  const [usersData, setUsersData] = useState<userProps>();
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      alert(data.message);
      setLoading(false);
      return;
    }

    setUsersData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (userInfo) {
      fetchUsers();
    }
  }, [userInfo])

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${userInfo?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    toast.success(`${data.message} 🦄`, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    fetchUsers();
  }

  console.log(usersData)
  return (
    <>
      <Typography component={'h1'} variant='h4'>Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>ISADMIN</TableCell>
              <TableCell>ORDERS</TableCell>
              <TableCell>ACTION</TableCell>
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
              usersData && usersData.users.map((user: UserInfo) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell>
                      {`${user._id.substring(0, 4)}...${user._id.substring(20, 24)}`}
                    </TableCell>
                    <TableCell >
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? 'YES' : 'NO'}</TableCell>
                    <TableCell sx={{ color: blue[800], textDecoration: 'underline' }}>
                      <Link href={`/admin/users/${user._id}/orders`}>
                        {usersData.orderCounts[user._id] || 0}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ display: 'flex', gap: 2 }}>
                      <Link href={`/admin/users/${user._id}/edit`}>
                        <ColorButton>Edit</ColorButton>
                      </Link>
                      <ColorButton onClick={() => handleDelete(user._id)}>Delete</ColorButton>
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
