import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface ProfileInfoProps {
  loading: boolean;
}

const ProfileInfoSkeleton: React.FC = () => (
  <SkeletonTheme baseColor="rgba(17, 25, 40, 0.75)" highlightColor="rgba(255, 255, 255, 0.125)">
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      p={3}
      className="bg-[#232F3E] rounded-xl shadow-lg"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton circle={true} height={60} width={60} />
        <Box>
          <Skeleton height={28} width={100} />
          <Skeleton height={20} width={80} />
        </Box>
      </Box>
      <Skeleton height={36} width={100} />
    </Box>
  </SkeletonTheme>
);

const ProfileInfo: React.FC<ProfileInfoProps> = ({ loading }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/user/dashboard/edit-profile");
  };

  if (loading) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      p={3}
      className="bg-[#232F3E] rounded-xl shadow-lg"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          alt={user?.fullName || "User Avatar"}
          src={user?.avatar || ""}
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {user?.fullName || "John Doe"}
          </Typography>
          <Typography variant="body2" color="white">
            @{user?.userName || "username"}
          </Typography>
        </Box>
      </Box>
      <Button onClick={handleRedirect} variant="contained" color="primary" size="small">
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileInfo;
