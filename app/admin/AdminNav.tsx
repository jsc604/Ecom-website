'use client'
import { List, ListItemButton, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <List className="flex lg:block">
      <Link href={'/admin/dashboard'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/dashboard' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/products'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/products' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Products" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/orders'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/orders' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/users'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/users' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/settings'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/settings' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Link>
    </List>
  )
}
