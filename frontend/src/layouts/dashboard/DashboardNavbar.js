import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';

import { JWT_TOKEN } from '../../utils/constants';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar() {
  const [authorized, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token, JWT_TOKEN);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('Token');
      } else setAuth(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    setAuth(false);
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {authorized ? (
            <Button variant="contained" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>

              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="outlined">Signup</Button>
              </Link>
            </>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
