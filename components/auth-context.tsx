"use client";

import { createContext, useContext } from "react";

type AuthState = {
  ready: boolean;
  authenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  user: { email?: { address: string } } | null;
};

const unavailable = () => {
  window.alert("Sign-in is not configured for this deployment yet.");
};

export const AuthContext = createContext<AuthState>({
  ready: true,
  authenticated: false,
  login: unavailable,
  logout: async () => {},
  getAccessToken: async () => null,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
