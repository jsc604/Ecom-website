'use client'
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Button, Card, Collapse, List, ListItemButton, TextField, Typography } from "@mui/material"
import { useState } from "react";

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
          <form>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 my-2">
              <TextField
                sx={{width: '100%'}}
                required
                id="email"
                label="Email"
                type="email"
              />
              <TextField
                sx={{width: '100%'}}
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <Button color='success' variant='contained' sx={{ width: '100%', marginTop: 1 }} className='bg-green-600'>Sign In</Button>
          </form>
        </Collapse>
      </List>

    </Card>
  )
}
