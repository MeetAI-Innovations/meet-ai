"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import previous from "@/assets/icons/previous.svg";
import axiosInstance from "@/utils/axios";
import CardSkeleton from "@/app/(contextRouteGroup)/user/dashboard/history/CardSkeletonHistory"; // Import the CardSkeleton component

interface HostDetails {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
}

interface Meeting {
  _id: string;
  title: string;
  description: string;
  status: string;
  roomId: string;
  hostDetails: HostDetails;
  guestDetails: Array<unknown>;
  userDetails: Array<unknown>;
  updatedAt: string;
}

export default function MeetingHistory() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const fetchMeetingsHistory = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5000/api/v1/user/get-meeting-history');
      console.log("API Response: ", response.data); // Log the API response
      
      // Access the meetings array from the response and set it in state
      
      setMeetings(response.data.data);
    } catch (error) {
      console.error("Error fetching meeting history:", error);
      setError("Failed to fetch meeting history.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchMeetingsHistory();
  }, []);

  return (
    <div className="flex flex-col items-center pt-4 sm:pt-11 pl-5 sm:pl-28 xs:pl-30 md:pl-32 lg:pl-56 min-h-screen px-4 w-full">
      {error ? (
        <Typography variant="body1" className="text-white">
          {error}
        </Typography>
      ) : loading ? ( // Show skeleton while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {Array.from({ length: 6 }).map((_, index) => ( // Adjust length based on your needs
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : meetings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {meetings.map((meeting) => (
            <Card
              key={meeting._id}
              className="bg-[#1c1c1c] text-white shadow-lg rounded-lg relative overflow-visible transition-transform hover:scale-105"
            >
              <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#333] shadow-lg overflow-hidden">
                <Image src={previous} alt="Previous Meeting Icon" width={30} height={30} />
              </div>

              <CardContent className="pt-12">
                <Typography variant="body1" className="mb-6 font-bold text-lg">
                  {meeting.title}
                </Typography>
                <Typography variant="body2" className="text-gray-400 text-sm">
                  Last Updated: {new Date(meeting.updatedAt).toLocaleString()}
                </Typography>

                <div className="flex items-center gap-2 mt-4">
                  <Avatar alt={meeting.hostDetails.fullName} />
                  <div>
                    <Typography variant="body2" className="text-sm font-bold">
                      {meeting.hostDetails.fullName}
                    </Typography>
                    <Typography variant="caption" className="text-gray-400 text-xs">
                      {meeting.hostDetails.email}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="body1" className="text-white">
          No meetings available
        </Typography>
      )}
    </div>
  );
}
