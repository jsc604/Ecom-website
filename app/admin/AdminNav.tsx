'use client'
import { Dashboard, Inventory, People, Receipt, Settings } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <List className="flex grid grid-cols-3 lg:block">
      <Link href={'/admin/dashboard'}>
        <ListItemButton sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: pathname.startsWith('/admin/dashboard') ? blue[50] : 'transparent',
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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: pathname.startsWith('/admin/products') ? blue[50] : 'transparent',
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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: pathname.startsWith('/admin/orders') ? blue[50] : 'transparent',
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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: pathname.startsWith('/admin/users') ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><People /></ListItemIcon>
          <ListItemText primary="Users" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
      <Link href={'/admin/settings'}>
        <ListItemButton sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: pathname.startsWith('/admin/settings') ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Settings /></ListItemIcon>
          <ListItemText primary="Settings" className="max-sm:hidden" />
        </ListItemButton>
      </Link>
    </List>
  )
}
