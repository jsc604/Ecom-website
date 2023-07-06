'use client'
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Button, Card, Collapse, List, ListItemButton, TextField, Typography } from "@mui/material"
import { useState } from "react";

export default function LoginCard() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Card sx={{ padding: 2 }}>
        <Typography className="text-3xl font-semibold">Have an account?</Typography>

        <List>
          <ListItemButton onClick={handleClick}>
            <Typography><Typography component="span" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>Log in</Typography> to checkout faster</Typography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <form>
              <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                <TextField
                  className="w-full"
                  required
                  id="email"
                  label="Email"
                  type="email"
                />
                <TextField
                  className="w-full"
                  required
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <Button color='success' variant='contained' sx={{ width: '100%', marginTop: 2 }} className='bg-green-600'>Sign In</Button>
            </form>
          </Collapse>
        </List>

      </Card>
    </div>
  )
}
