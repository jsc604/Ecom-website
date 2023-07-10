'use client'
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Card, Collapse, List, ListItemButton, Typography } from "@mui/material"
import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function LoginCard() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ padding: 2 }}>
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

    </Card>
  )
}
