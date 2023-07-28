'use client'
import Link from 'next/link'
import { AppBar, Box, Toolbar, IconButton, Divider, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Menu } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import { useScrollTrigger } from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { CartItems, Store } from '@/utils/StoreProvider';
import AccountMenu from './login/AccountMenu';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#27272a',
});

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 4,
    padding: '0 4px',
    color: 'white',
  },
}));

interface HideOnScrollProps {
  children: ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const drawerWidth = 240;
const navItems = ['wheels', 'tires', 'accessories'];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useContext(Store);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Link href='/'>
        <ListItemButton onClick={handleDrawerToggle}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Ecom MN
          </Typography>
        </ListItemButton>
      </Link>
      <Divider />
      <List>
        {navItems.map((text) => (
          <Link href={`/products/${text}`} key={text} >
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemText primary={text} sx={{ textTransform: 'capitalize' }} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll >
        <StyledAppBar>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: 11 / 12, maxWidth: 1350, marginX: 'auto' }}>
            <Box component='div' sx={{ display: { xs: 'block', sm: 'none' }, alignItems: 'center' }}>
              <Link href='/'>
                <ListItemButton>
                  <Typography variant="h6" color='white' fontWeight='bold'>
                    Ecom MN
                  </Typography>
                </ListItemButton>
              </Link>
            </Box>
            <Box component='div' sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
              <Link href='/'>
                <ListItemButton>
                  <Typography variant="h6" color='white' fontWeight='bold'>
                    Ecom MN
                  </Typography>
                </ListItemButton>
              </Link>
              <List sx={{ display: 'flex' }}>
                {navItems.map((text) => (
                  <Link href={`/products/${text}`} key={text}>
                    <ListItemButton>
                      <ListItemText primary={text} sx={{ textTransform: 'capitalize' }} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountMenu />
              <Link href={'/cart'}>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartItems.length > 0 ? cartItems.length : '0'} color='info' >
                    <ShoppingCart sx={{ width: 28, height: 28, color: 'white' }} />
                  </StyledBadge>
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 0.5
                  , display: { xs: 'block', sm: 'none' }
                }}
              >
                <Menu />
              </IconButton>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </>
  );
}