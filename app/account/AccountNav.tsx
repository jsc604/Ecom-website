'use client'
import { List, ListItemButton, ListItemText } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <List className="flex lg:block">
      <Link href={'/account/profile'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/account/profile' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Link>
      <Link href={'/account/order-history'}>
        <ListItemButton sx={{
          backgroundColor: pathname === '/account/order-history' ? blue[50] : 'transparent',
          '&:hover': {
            backgroundColor: blue[50],
          },
        }}>
          <ListItemText primary="Order History" />
        </ListItemButton>
      </Link>
    </List>
  )
}
