
'use client';

import axios from 'axios';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface UserContextTypes {
  token: string | null;
  setToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
}

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/set-access-token', {
          withCredentials: true
        });
        setToken(response.data.data.accessToken);
        setRefreshToken(response.data.data.refreshToken);
      } catch (err) {
        console.error("Error fetching access token: ", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          router.push('/login'); // Redirect to login or page where users can re-authenticate
        }
      }
    };

    initAuth();
  }, [router]);

  console.log("Token: ", token);
  console.log("Refresh token: ", refreshToken);

  return (
    <UserContext.Provider value={{ token, setToken, refreshToken, setRefreshToken }}>
      {children}
    </UserContext.Provider>
  );
};
