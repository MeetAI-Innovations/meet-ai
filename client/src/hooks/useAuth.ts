"use client";
import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  return { user, loading };
};

export default useAuth;
