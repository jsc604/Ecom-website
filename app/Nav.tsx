'use client'

import Link from 'next/link'
import { AppBar, Box, Toolbar, IconButton, Divider, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingBag, Menu } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import { useScrollTrigger } from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import BackgroundLetterAvatars from './Home/Avatar';
import { CartItems, Store } from '@/utils/StoreProvider';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#27272a',
});

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: '50%',
    top: '69%',
    transform: 'translate(50%, -50%)',
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
              <ListItemText primary={text} className='capitalize' />
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
          <Toolbar className='flex justify-between'>
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
                      <ListItemText primary={text} className='capitalize' />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Box>
            <div className='flex items-center'>
              <Link href='/'>
                <ListItemButton className='text-white'>
                  <BackgroundLetterAvatars />
                </ListItemButton>
              </Link>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartItems.length > 0 ? cartItems.length : '0'} >
                  <ShoppingBag className='text-white' />
                </StyledBadge>
              </IconButton>
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
            </div>
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