import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import AudioVolumeIndicator from '@/components/Meeting/AudioVolumeIndicator'; // Ensure path is correct
import PermissionPrompt from '@/components/Meeting/PermissionPrompt';

interface SetupUIProps {
  onSetUpComplete: () => void;
}

const MeetingSetUp = ({ onSetUpComplete }: SetupUIProps) => {
  const call = useCall();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const [micDisabled, setMicDisabled] = useState(false);
  const [camDisabled, setCamDisabled] = useState(false);

  useEffect(() => {
    const manageDevices = async () => {
      if (call) {
        try {
          // Manage microphone
          if (micDisabled) {
            await call.microphone.disable();
          } else {
            await call.microphone.enable();
          }

          // Manage camera
          if (camDisabled) {
            await call.camera.disable();
          } else {
            await call.camera.enable();
          }
        } catch (error) {
          console.error('Error managing devices: ', error);
        }
      }
    };

    manageDevices();
  }, [micDisabled, camDisabled, call]);

  const micState = useMicrophoneState();
  const camState = useCameraState();

  // Check if microphone or camera permissions are missing
  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <h1 className='text-center text-2xl font-bold'>SetUp</h1>
      <VideoPreview />
      <div className='flex h-16 items-center gap-3'>
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>

      {/* Checkbox to disable/enable microphone */}
      <label className='flex items-center gap-2 font-medium'>
        <input
          type='checkbox'
          checked={micDisabled}
          onChange={(e) => setMicDisabled(e.target.checked)}
        />
        Join with microphone off
      </label>

      {/* Checkbox to disable/enable camera */}
      <label className='flex items-center gap-2 font-medium'>
        <input
          type='checkbox'
          checked={camDisabled}
          onChange={(e) => setCamDisabled(e.target.checked)}
        />
        Join with camera off
      </label>

      <Button onClick={onSetUpComplete}>Join Meeting</Button>
    </div>
  );
};

export default MeetingSetUp;
