import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from '../../molecules/header';
import { Navigation } from '../../molecules/navigation';
import { Footer } from '../../molecules/footer';

export interface AppLayoutProps {
  user?: Record<string, unknown>;
  onLogout?: () => void;
  children: React.ReactNode;
}

export function AppLayout({ user, onLogout, children }: AppLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependency is intentional (route change scroll reset)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header user={user} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Navigation onLogout={onLogout} />
        <Box component='main' sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
