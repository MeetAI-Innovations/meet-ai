import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { streamClient } from "../config/getStream";

const getTokenUser = asyncHandler(async(req: any, res: Response)=>{
  console.log("Api Key",process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY);
  
    const userId = req.query.userId as string; 
    console.log(userId);
    
  const token = streamClient.createToken(userId);
  res.json({ userId,token });
})

const getTokenGuest = asyncHandler(async(req: any, res: Response)=>{
  console.log(process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY);
  
    const guestId = req.query.guestId as string; 
    console.log(guestId);
    
  const token = streamClient.createToken(guestId);
  res.json({ guestId,token });
})

export {
    getTokenUser,
    getTokenGuest
}