import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BackgroundLetterAvatars from '../../home/Avatar';
import { Store } from '@/utils/StoreProvider';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AccountCircleOutlined, AdminPanelSettingsOutlined, HistoryOutlined, LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function AccountMenu() {
  const router = useRouter();
  const { userInfo, handleUserLogout } = React.useContext(Store);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleMenuItemClick = (redirectUrl: string) => {
    setAnchorEl(null);
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  const handleLogout = () => {
    setAnchorEl(null);
    deleteCookie('cartItems');
    deleteCookie('userInfo');
    deleteCookie('shippingInfo');
    handleUserLogout();
    router.push('/');
    toast.info('You have been logged out successfully. Goodbye!', {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <BackgroundLetterAvatars />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {userInfo === null ? (
          <MenuItem onClick={() => handleMenuItemClick('/account/login')}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            Login / Register
          </MenuItem>
        ) : (
          <div>
            <MenuItem onClick={() => handleMenuItemClick('/account/admin')}>
              <ListItemIcon>
                <AdminPanelSettingsOutlined />
              </ListItemIcon>
              Admin
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/account/profile')}>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/account/orders')}>
              <ListItemIcon>
                <HistoryOutlined />
              </ListItemIcon>
              Order History
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}
