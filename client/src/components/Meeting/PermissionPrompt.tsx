import { Mic, Webcam } from 'lucide-react'
import React from 'react'

const PermissionPrompt = () => {
  return (
    <div className='flex flex-col items-center gap-3'>
        <div className='flex items-center gap-3'>
            <Webcam size={40}></Webcam>
            <Mic size={40}/>
            
        </div>
        <p className='text-center'>Please allow access to your Microphone and camera to join the call </p>
    </div>
  )
}

export default PermissionPrompt