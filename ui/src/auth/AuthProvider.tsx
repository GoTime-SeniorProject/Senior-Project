import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { apolloClient } from '../lib/apollo-client';
import {
  GetUserByUsernameDocument,
  GetUserDocument,
  type GetUserByUsernameQuery,
  type GetUserByUsernameQueryVariables,
  type GetUserQuery,
  type GetUserQueryVariables,
} from '../generated';
import { AuthContext, type User } from './AuthContext';

function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)),
  ]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('authUser');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      localStorage.setItem('authToken', String(user.id ?? user.username ?? ''));
    } else {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    }
  }, [user]);

  const refreshUser = useCallback(async () => {
    if (!user) {
      if (isMounted.current) setLoading(false);
      return;
    }
    if (isMounted.current) setLoading(true);
    try {
      const { data } = await withTimeout(
        apolloClient.query<GetUserQuery, GetUserQueryVariables>({
          query: GetUserDocument,
          variables: { id: user.id as string },
        })
      );
      if (isMounted.current) setUser(data?.getUser ?? null);
    } catch {
      if (isMounted.current) setUser(null);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await withTimeout(
        apolloClient.query<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>({
          query: GetUserByUsernameDocument,
          variables: { username },
        })
      );

      const found = data?.getUsers?.[0];
      if (!found || found.password !== password) {
        return false;
      }

      setUser({
        id: found.id,
        firstName: found.firstName ?? null,
        lastName: found.lastName ?? null,
        username: found.username,
        profileImg: found.profileImg ?? null,
        password: found.password,
        role: (found as any).role ?? null,
        organization: (found as any).organization ?? null,
        organizationUsername: null,
        createdAt: (found as any).createdAt ?? null,
        updatedAt: (found as any).updatedAt ?? null,
      });
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
