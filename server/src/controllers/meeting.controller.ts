import { asyncHandler } from "../utils/asyncHandler";
import Meeting, { IMeeting } from "../models/meeting.model";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import mongoose, { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/apiResponse";
import { streamClient } from "../config/getStream";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

const { ObjectId } = mongoose.Types;
const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
const issuedAt = Math.floor(Date.now() / 1000) - 60;

const createMeeting: any = asyncHandler(async (req: any, res: Response) => {
  const {
    title,
    description,
    participants,
    scheduledTime,
    type,
    status,
    roomId,
  } = req?.body;
  const createdBy = req?.user?.id;
  let participantsList: any;

  // while (!uniqueRoomId) {
  //   roomId = generateRoomId();

  //   const existingMeeting = await Meeting.findOne({ roomId });
  //   if (!existingMeeting) {
  //     uniqueRoomId = true;
  //   }
  // }

  if (type === "private" && participants?.length > 0) {
    participantsList = await Promise.all(
      participants.map(async (participant: any) => {
        if (participant._id === createdBy) {
          return null;
        }
        if (participant.userName) {
          const user = await User.findOne({ userName: participant.userName });
          if (user) {
            return {
              userId: user._id,
              role: "participant",
              userName: user.userName,
            };
          } else {
            throw new ApiError(
              404,
              `User with user name ${participant.userName} not found`
            );
          }
        } else if (participant.guestName) {
          const guestId = crypto.randomUUID();
          return {
            guestId,
            role: "guest",
            guestName: participant.guestName,
          };
        } else {
          throw new ApiError(400, "Invalid participant details");
        }
      })
    );
  }

  const newMeeting = await Meeting.create({
    title,
    host: createdBy,
    description,
    participants: participantsList || [],
    scheduledTime,
    createdBy: new ObjectId(createdBy),
    roomId: roomId,
    status: status ? status : "not scheduled",
    type: type,
  });

  if (!newMeeting) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, newMeeting, "meeting created"));
});

const addJoinedParticipant: any = asyncHandler(
  async (req: any, res: Response) => {
    console.log(req?.user);
    const user = {
      userId: req?.user?._id,
      userName: req?.user?.userName,
      avatar: req?.user?.avatar,
      role: "participant",
    };

    console.log(user);

    const meeting: IMeeting | any = await Meeting.findById(
      req?.body?.meetingId
    );

    if (!meeting) {
      throw new ApiError(404, "Meeting not found");
    }

    if (meeting?.status === "completed") {
      throw new ApiError(410, "Meeting was ended");
    }

    if (meeting?.status === "canceled") {
      throw new ApiError(410, "Meeting was canceled");
    }

    if (meeting?.host?.toString() === req?.user?.id) {
      throw new ApiError(401, "You are hosts");
    }

    const isParticipantExists = meeting?.participants?.some(
      (p: any) => p.userId && p.userId === req?.user?.id
    );

    if (isParticipantExists) {
      return res.status(400).json({
        success: false,
        message: "Participant already exists in the meeting",
      });
    }

    meeting?.participants?.push(user);

    await meeting?.save();

    return res
      .status(200)
      .json(new ApiResponse(201, meeting, "Participant Added successfully"));
  }
);

const endMeeting = asyncHandler(async (req: any, res: Response) => {
  const { meetingId } = req.params;
  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }

  if (meeting.status === "completed" || meeting.status === "canceled") {
    throw new ApiError(400, "Meeting already ended or canceled");
  }

  const currentTime = new Date();
  meeting.endTime = currentTime;

  const duration =
    (currentTime.getTime() - meeting.scheduledTime.getTime()) / 6000;
  meeting.duration = duration;

  meeting.status = "completed";

  await meeting.save();

  return res
    .status(200)
    .json(new ApiResponse(201, meeting, "Meeting ended successfully"));
});

export { createMeeting, addJoinedParticipant, endMeeting };
