"use client";

import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  hydrated: boolean; // NEW

  setAuth: (user: User, access: string, refresh: string) => void;
  setTokens: (access: string, refresh: string) => void;
  loadFromStorage: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  hydrated: false,

  setAuth: (user, accessToken, refreshToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "auth",
        JSON.stringify({ user, accessToken, refreshToken })
      );
    }
    set({ user, accessToken, refreshToken });
  },

  setTokens: (accessToken, refreshToken) => {
    if (typeof window !== "undefined") {
      const existed = localStorage.getItem("auth");
      const parsed = existed ? JSON.parse(existed) : {};
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...parsed, accessToken, refreshToken })
      );
    }
    set({ accessToken, refreshToken });
  },

  loadFromStorage: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth");

      if (stored) {
        const { user, accessToken, refreshToken } = JSON.parse(stored);
        set({ user, accessToken, refreshToken });
      }
      set({ hydrated: true });
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      hydrated: true,
    });
  },
}));
