import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import { useTheme } from '@emotion/react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const AvatarMenu = ({ colorContext, onLogout, token, username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const open = Boolean(anchorEl);
  const colorMode = React.useContext(colorContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            id="menuBtn"
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {token?
              <Avatar sx={{ width: 32, height: 32 }}>{username.charAt(0).toUpperCase()}</Avatar>:
              <MenuIcon sx={{ width: 32, height: 32 }}/>
            }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
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
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {token ?
          <MenuItem component={RouterLink} to={`/${username}`} id="profileUserBtn">
            <ListItemIcon>
              <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My Profile
            </Typography>
          </MenuItem>
          : null}
        <Divider />
        <MenuItem
          onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ?
            <>
              <ListItemIcon>
                <Brightness7Icon />
              </ListItemIcon>
            Lightmode</> :
            <>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
            Darkmode</>}
        </MenuItem>
        {token ?
          <MenuItem onClick={() => onLogout()} id="logoutBtn">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
          Logout
          </MenuItem> :
          <MenuItem component={RouterLink} to='/login'>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        }
      </Menu>
    </>
  );
};

export default AvatarMenu;
