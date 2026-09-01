import { useCallback, useEffect, useState, type ReactNode } from 'react';
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
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
        query: GetUserDocument,
        variables: { id: user.id as string },
        fetchPolicy: 'network-only',
      });
      setUser(data?.getUser ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await apolloClient.query<
        GetUserByUsernameQuery,
        GetUserByUsernameQueryVariables
      >({
        query: GetUserByUsernameDocument,
        variables: { username },
        fetchPolicy: 'network-only',
      });

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
