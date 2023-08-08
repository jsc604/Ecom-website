'use client'
import { Edit, Receipt } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"

interface PageProps {
  id: string;
  name: string;
  pageName: string;
}

export default function UserNav({ id, name, pageName }: PageProps) {

  return (
    <>
      <Typography component={'div'} sx={{ fontWeight: 600 }}>User #{id}</Typography>
      <Typography component={'div'} sx={{ fontWeight: 600 }}>{name}</Typography>

      <List className="flex">

        <Link href={`/admin/users/${id}/edit`}>
          <ListItemButton sx={{
            backgroundColor: pageName === 'edit' ? blue[50] : 'transparent',
            '&:hover': {
              backgroundColor: blue[50],
            },
          }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Edit /></ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </Link>

        <Link href={`/admin/users/${id}/orders`}>
          <ListItemButton sx={{
            backgroundColor: pageName === 'orders' ? blue[50] : 'transparent',
            '&:hover': {
              backgroundColor: blue[50],
            },
          }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}><Receipt /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </Link>

      </List>
    </>
  )
}
