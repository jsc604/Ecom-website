'use client'
import { List, ListItemButton, ListItemText } from "@mui/material"
import { grey } from "@mui/material/colors"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <List>
      <Link href={'/account/profile'}>
        <ListItemButton sx={{ backgroundColor: pathname === '/account/profile' ? grey[100] : 'transparent' }}>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Link>
      <Link href={'/account/order-history'}>
        <ListItemButton sx={{ backgroundColor: pathname === '/account/order-history' ? grey[100] : 'transparent' }}>
          <ListItemText primary="Order History" />
        </ListItemButton>
      </Link>
    </List>
  )
}
