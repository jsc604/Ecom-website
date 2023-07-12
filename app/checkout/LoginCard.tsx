'use client'
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Card, Collapse, List, ListItemButton, Typography } from "@mui/material"
import { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import { Store } from "@/utils/StoreProvider";

export default function LoginCard() {
  const { userInfo } = useContext(Store);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const firstName = userInfo?.name.split(' ')[0];

  return (
    <Card sx={{ padding: 2 }}>
      {userInfo !== null ? (
        <>
          <Typography sx={{fontSize: 20, fontWeight: 600}}>Hey {firstName}, thanks for choosing to checkout!</Typography>
          <Typography sx={{fontSize: 18}}>We appreciate your business and are excited to process your order. Please review your shipping information and complete the necessary steps to finalize your purchase. If you have any questions or need assistance, feel free to reach out to our customer support team. Happy shopping!</Typography>
        </>
      ) : (
        <>
          <Typography className="text-3xl font-semibold">Have an account?</Typography>
          <List>
            <ListItemButton onClick={handleClick}>
              <Typography><Typography component="span" sx={{ fontWeight: 600, textDecoration: 'underline' }}>Log in</Typography> to checkout faster</Typography>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <LoginForm />
            </Collapse>
          </List>
        </>
      )}
    </Card>
  )
}
