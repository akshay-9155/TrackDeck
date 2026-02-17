import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AccountMenu({handleLogoutClick, handleChangePasswordClick}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    handleLogoutClick();
    setAnchorEl(null);
  };
  const handleChangePasswordClose = () => {
    handleChangePasswordClick();
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Account
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleChangePasswordClose}>Change Password</MenuItem>
        <MenuItem sx={{color: 'error.main'}} onClick={handleLogoutClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
