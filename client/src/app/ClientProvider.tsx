"use client";

import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { base_url } from "@/config/config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser } from "@/redux/slices/authSlice";

interface ClientProviderProps {
  children: React.ReactElement;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const videoClient = useInitializeVideoClient();

  return videoClient ? (
    <StreamVideo client={videoClient}>{children}</StreamVideo>
  ) : (
    <>{children}</>
  );
}

function useInitializeVideoClient() {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const initializeClient = async () => {
      if (!user || !user._id) {
        console.error("User or user ID is missing");
        setLoading(false);
        return;
      }

      const streamUser: User = {
        id: user._id,
        name: user.userName || user._id,
      };

      const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
      if (!apiKey) {
        console.error("Stream API key is not set");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${base_url}/token/get-token-user?userId=${user._id}`
        );

        if (!response.data?.token) {
          throw new Error("Failed to retrieve token for the user");
        }

        const client = new StreamVideoClient({
          apiKey,
          user: streamUser,
          tokenProvider: () => Promise.resolve(response.data.token),
        });

        setVideoClient(client);
      } catch (error) {
        console.error("Failed to initialize Stream client:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      initializeClient();
    }

    return () => {
      if (videoClient) {
        videoClient.disconnectUser(); 
      }
    };
  }, [user]); 

  return loading ? null : videoClient;
}
