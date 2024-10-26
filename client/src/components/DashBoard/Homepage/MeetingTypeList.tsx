'use client';

import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import HomeCard from '@/components/DashBoard/Homepage/HomeCard';
import { StateCardData } from '@/constants/StateCardData';
import { useUserContext } from '@/Context/userContext';

const MeetingTypeList = () => {
  const { token } = useUserContext(); // Assuming user authentication context is used here.
  const router = useRouter();

  const handleCardClick = (state: 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'isPrivateMeeting') => {
    if (state === 'isInstantMeeting') {
      router.push('/user/create-meeting'); // Redirect to the instant meeting creation page.
    } else if (state === 'isScheduleMeeting') {
      router.push('/user/create-meeting'); // Redirect to the schedule meeting page.
    } else if (state === 'isJoiningMeeting') {
      router.push('/user/create-meeting'); // Redirect to the join meeting page.
    } else if (state === 'isPrivateMeeting') {
      router.push('/user/create-meeting'); // Redirect to the private meeting page.
    }
  };

  return (
    <Box className="grid grid-cols-1 gap-3 md:gap-3 lg:gap-4 md:grid-cols-2 xl:grid-cols-4">
      {StateCardData.map((item, index) => (
        <HomeCard
          key={index}
          img={item.img}
          title={item.title}
          description={item.description}
          iconbg={item.iconbg}
          iconColor={item.iconColor}
          handleClick={() => handleCardClick(item.isState)}
        />
      ))}
    </Box>
  );
};

export default MeetingTypeList;
