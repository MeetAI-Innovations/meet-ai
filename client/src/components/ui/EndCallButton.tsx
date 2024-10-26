import { Button } from '@mui/material';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Check if the local participant is the owner of the call
  const isMeetingOwner = localParticipant?.userId === call?.state?.createdBy?.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    try {
      // End the call for everyone
      await call?.endCall();
      // Redirect to the homepage
      router.push('/');
    } catch (error) {
      console.error('Error ending the call:', error);
    }
  };

  return (
    <Button
      onClick={handleEndCall}
      className='bg-red-500 text-white hover:bg-red-600'
    >
      End Call for Everyone
    </Button>
  );
};

export default EndCallButton;
