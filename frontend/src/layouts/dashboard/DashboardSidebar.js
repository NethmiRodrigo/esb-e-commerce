import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';

import navConfig from './NavConfig';
import { JWT_TOKEN } from '../../utils/constants';
import Iconify from '../../components/Iconify';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const navItems = navConfig;

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <Logo />
      </Box>

      <Typography variant="h4" sx={{ px: 2.5, pb: 3, display: 'inline-flex', letterSpacing: 6 }}>
        TipToe
      </Typography>

      <NavSection navConfig={navItems} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
