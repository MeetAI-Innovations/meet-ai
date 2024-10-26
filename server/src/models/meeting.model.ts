import mongoose, { Schema, Document, ObjectId, model } from "mongoose";

export interface IMeeting extends Document {
  _id: ObjectId;
  title: string;
  participants: [];
  description?: string;
  scheduledTime: Date;
  duration: number;
  createdBy: Schema.Types.ObjectId;
  status: "scheduled" | "not scheduled" | "completed" | "canceled";
  endTime?: Date;
  host: Schema.Types.ObjectId;
  type: "public" | "private";
  roomId: string; // Unique room ID
  enableSummary: boolean; // To check if the user wants the summary of the meeting
  dialogues: string;
  summary: string;
}

const MeetingSchema = new Schema<IMeeting>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    participants: [],
    scheduledTime: {
      type: Date,
      default: Date.now(),
    },
    endTime: {
      type: Date
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "not scheduled", "completed", "canceled"],
      default: "scheduled",
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["public", "private"],
    },
    enableSummary:{
      type:Boolean,
      required:true,
      default:false
    },
    dialogues: {
      type: String,
    },
    summary: {
      type: String
    }
  },
  { timestamps: true }
);

const Meeting = model<IMeeting>("Meeting", MeetingSchema);

export default Meeting;
