// In `AudioVolumeIndicator.tsx` or `AudioVolumeIndicator.jsx`
import React, { useEffect, useState } from 'react';
import { createSoundDetector, Icon, useCallStateHooks } from '@stream-io/video-react-sdk';

const AudioVolumeIndicator = () => {
    const { useMicrophoneState } = useCallStateHooks();
    const { isEnabled, mediaStream } = useMicrophoneState();
    const [audioLevel, setAudioLevel] = useState(0);

    useEffect(() => {
        if (!isEnabled || !mediaStream) return;

        // Create sound detector with options
        const disposeSoundDetector = createSoundDetector(
            mediaStream,
            ({ audioLevel: al }) => setAudioLevel(al),
            { detectionFrequencyInMs: 80, destroyStreamOnStop: false }
        );

        return () => {
            // Clean up the sound detector when component unmounts
            disposeSoundDetector().catch(console.error);
        };
    }, [isEnabled, mediaStream]);

    if (!isEnabled) return null;

    return (
        <div className='flex w-72 items-center gap-3 rounded-md bg-slate-900 p-4'>
            <Icon icon="mic" />
             <div className='h-1.5 flex-1 rounded-md bg-white'>
                <div className='w-full h-full origin-left bg-blue-500'
                style={{transform:`scaleX(${audioLevel/100})`}}/>
             </div>
        </div>
    );
};

export default AudioVolumeIndicator;
