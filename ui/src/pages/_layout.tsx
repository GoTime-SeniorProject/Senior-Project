import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthProvider';
import { useAuth } from '../auth/useAuth';
import { AppLayout } from '../components/organisms/app-layout';
import { Loading } from '../components/molecules/loading/Loading';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

const titles: Record<string, string> = {
  '/': 'Home | Senior Project',
  '/login': 'Login | Senior Project',
};

function AuthGate() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    document.title = titles[pathname] ?? 'Senior Project';
  }, [pathname]);

  useEffect(() => {
    const isLoginRoute = pathname === '/login';
    if (!isLoginRoute && !user && !loading) {
      navigate('/login', { replace: true });
    }
    if (user && isLoginRoute) {
      navigate('/', { replace: true });
    }
  }, [pathname, user, loading, navigate]);

  if (loading) {
    return <Loading text='Checking authentication...' />;
  }

  const isLoginRoute = location.pathname === '/login';

  if (isLoginRoute || !user) {
    return <Outlet />;
  }

  return (
    <AppLayout user={user} onLogout={logout}>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
