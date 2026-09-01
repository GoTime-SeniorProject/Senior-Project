import { createContext } from 'react';

export type User = Record<string, unknown> & { id?: string; username?: string };

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
