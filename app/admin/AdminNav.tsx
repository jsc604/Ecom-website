'use client'
import { Dashboard, Inventory, People, Receipt } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const pageName = pathname.split('/')[4];

  return (
    <List className="flex lg:block">
      <Link href={'/admin/dashboard'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/dashboard' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/products'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/products' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Inventory /></ListItemIcon>
          <ListItemText primary="Products" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/orders'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/orders' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Receipt /></ListItemIcon>
          <ListItemText primary="Orders" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/users'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/admin/users' || pageName === 'edit' || pageName === 'orders' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><People /></ListItemIcon>
          <ListItemText primary="Users" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
    </List>
  )
}
