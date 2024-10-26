import { Response } from "express";
import Meeting, { IMeeting } from "../models/meeting.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/apiError";

const addDialogue = asyncHandler(async (req: any, res: Response) => {
  const { dialogue, meetingId } = req.body;
  if (!dialogue || !meetingId) {
    throw new ApiError(400, "Dialogue or meeting id is missing!")
  }
  if (!isValidObjectId(meetingId)) {
    throw new ApiError(400, "Invalid meeting id!");
  }

  const meeting: any = await Meeting.findById(meetingId);
  if (!meeting) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Meeting not found"));
  }
  if (!meeting.dialogues || meeting.dialogues === "") {
    meeting.dialogues = dialogue;
  } else {
    meeting.dialogues += `\n${dialogue}`;
  }
  await meeting.save();

  return res
    .status(200)
    .json(new ApiResponse(200, meeting, "Dialogue appended successfully"));
});

export { addDialogue };
