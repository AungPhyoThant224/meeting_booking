import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OWNER' | 'USER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null,
  token: Cookies.get('token') || null,

  setAuth: (user, token) => {
    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(user), { expires: 1, secure: true, sameSite: 'strict' });
    
    set({ user, token });
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ user: null, token: null });
  },

  isAuthenticated: () => !!get().token,
}));