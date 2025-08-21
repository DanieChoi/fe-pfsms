import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IHeaderMenuItem, IMenuItem, User } from '@/types/interface/object';
import { getAuthToken, getAvailableMenu, getHeaderMenus, getUserInfo } from '../api/auth';

interface AuthState {
  user: User | null;
  availableMenu: IMenuItem[];
  headerMenus: IHeaderMenuItem[];
  tokenKey: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  setUser: (user: User) => void;
  setAvailableMenu: (availableMenu: IMenuItem[]) => void;
  setHeaderMenus: (headerMenus: IHeaderMenuItem[]) => void;
  setToken: (tokenKey: string) => void;
  login: (user: User, availableMenu: IMenuItem[], headerMenus: IHeaderMenuItem[], token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      availableMenu: [],
      headerMenus: [],
      tokenKey: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user: User) =>
        set({ user, isAuthenticated: true }),
      setAvailableMenu: (availableMenu: IMenuItem[]) =>
        set({ availableMenu, isAuthenticated: true }),
      setHeaderMenus: (headerMenus: IHeaderMenuItem[]) =>
        set({ headerMenus }),
      setToken: (tokenKey: string) =>
        set({ tokenKey }),
      login: (user: User, availableMenu: IMenuItem[], headerMenus: IHeaderMenuItem[], tokenKey: string) =>
        set({
          user,
          availableMenu,
          headerMenus,
          tokenKey,
          isAuthenticated: true,
          isLoading: false
        }),
      logout: () => {
        // Zustand 상태 초기화
        set({
          user: null,
          availableMenu: [],
          headerMenus: [],
          tokenKey: null,
          isAuthenticated: false,
          isLoading: false
        });
      },
      setLoading: (loading: boolean) =>
        set({ isLoading: loading }),
      // 앱 시작시 localStorage에서 인증 정보 복원
      initializeAuth: () => {
        const tokenKey = getAuthToken();
        const user = getUserInfo();
        const availableMenu = getAvailableMenu();
        const headerMenus = getHeaderMenus();
        if (tokenKey && user && availableMenu && headerMenus) {
          set({
            user,
            availableMenu,
            headerMenus,
            tokenKey,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          set({
            user: null,
            availableMenu: [],
            headerMenus: [],
            tokenKey: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        availableMenu: state.availableMenu,
        headerMenus: state.headerMenus,
        token: state.tokenKey,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);