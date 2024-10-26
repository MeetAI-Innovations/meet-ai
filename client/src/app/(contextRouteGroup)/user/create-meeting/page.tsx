"use client";

import useAuth from "@/hooks/useAuth";
import axiosInstance from "@/utils/axios";
import {
  Call,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";

export default function CreateMeetingPage() {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [activeTime, setActiveTime] = useState(false);
  const [activeType, setActiveType] = useState(false);
  const [participantsInput, setParticipantsInput] = useState("");
  const [call, setCall] = useState<Call>();
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [allUsers, setAllUsers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [join, setJoin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const client = useStreamVideoClient();
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();


  

  useEffect(() => {
    const fetchUsers = async () => {
      // const users = [
      //   { email: "john.doe@example.com", userName: "John Doe" },
      //   { email: "jane.smith@example.com", userName: "Jane Smith" },
      //   { email: "alice.wonderland@example.com", userName: "Alice Wonderland" },
      // ];

      const res = await axiosInstance.get("/user/get-all-users");
      console.log(res.data.data);
      setAllUsers(res.data.data);
    };
    fetchUsers();
  }, []);

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      const response = await call.getOrCreate({
        data: {
          custom: { description: descriptionInput && descriptionInput },
        },
      });
      setCall(call);
      if (call) {
        const res = await axiosInstance.post("meeting/create-meeting", {
          title: titleInput,
          description: descriptionInput,
          participants: selectedParticipants,
          scheduleTime: startTimeInput,
          status: activeTime ? "scheduled" : "not scheduled",
          roomId: call?.cid,
          type: activeType ? "private" : "public",
        });
        console.log(res.data.data);
      }
      // router.push(`meeting/${call?.cid}`);
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  const joinMeeting = async () => {
    if (input.trim()) {
      router.push(`/meeting/${input.trim()}`);
    } else {
      alert("Please enter a valid meeting ID.");
    }
  };

  const filteredUsers = allUsers.filter(
    (user: any) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!client || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="animate-spin text-indigo-500" size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueAccent-1001 flex flex-col items-center py-10 px-4">
      <h1 className="text-center text-3xl font-extrabold text-white mb-8">
        Welcome, {user.userName}!
      </h1>
      <div className="w-full max-w-md bg-blueAccent-1002 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Create a New Meeting</h2>
        <TitleInput value={titleInput} onChange={setTitleInput} />
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} activeTime={activeTime} setActiveTime={setActiveTime} />
        <ParticipantsInput
          users={allUsers}
          selectedParticipants={selectedParticipants}
          setSelectedParticipants={setSelectedParticipants}
          activeType={activeType}
          setActiveType={setActiveType}
          setShowModal={setShowModal}
        />

<button
  onClick={createMeeting}
  className="w-full bg-purpleAccent-200 hover:bg-purpleAccent-100 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition transform hover:scale-105 duration-300"
  style={{ padding: '12px 24px', borderRadius: '8px' }} // Adjust padding and border-radius
>
  Create Meeting
</button>

<button
  className="w-full bg-blue-900 hover:bg-blue-2 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition transform hover:scale-105 duration-300"
  onClick={() => setJoin(true)}
  style={{ padding: '12px 24px', borderRadius: '8px' }} // Adjust padding and border-radius
>
  Join a Meeting
</button>

        {join && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={joinMeeting}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition transform hover:scale-105 duration-300"
            >
              Join
            </button>
          </div>
        )}
      </div>
      {call && <MeetingLink call={call} />}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#313131] p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Invite Participants</h2>
            <input
              type="text"
              placeholder="Search by email or username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col">
              {filteredUsers.map((user: any) => (
                <label
                  key={user.email}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(user.email)}
                    onChange={() => {
                      const newSelected = selectedParticipants.includes(
                        user.email
                      )
                        ? selectedParticipants.filter(
                            (email) => email !== user.email
                          )
                        : [...selectedParticipants, user.email];
                      setSelectedParticipants(newSelected);
                    }}
                  />
                  {user.userName} ({user.email})
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 text-red-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <label className="block">
      <span className="text-white font-medium">Title</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter meeting title"
      />
    </label>
  );
}

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="block">
      <div className="text-white font-medium mb-2">Meeting Info:</div>
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            if (!e.target.checked) {
              onChange("");
            }
          }}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span className="text-gray-300">Add Description</span>
      </label>
      {active && (
        <label className="block">
          <span className="text-white font-medium">Description</span>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            rows={4}
            className="mt-1 block w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting description (optional)"
          />
          <div className="text-gray-400 text-sm text-right">
            {value.length}/500
          </div>
        </label>
      )}
    </div>
  );
}

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
  activeTime: boolean;
  setActiveTime: (value: boolean) => void;
}

function StartTimeInput({ value, onChange, activeTime, setActiveTime }: StartTimeInputProps) {
  

  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div className="block">
      <div className="text-white font-medium mb-2">Meeting Start:</div>
      <div className="flex items-center gap-4 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={!activeTime}
            onChange={() => {
              setActiveTime(false);
              onChange("");
            }}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-300">Start immediately</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={activeTime}
            onChange={() => {
              setActiveTime(true);
              onChange(dateTimeLocalNow);
            }}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-300">Schedule for later</span>
        </label>
      </div>
      {activeTime && (
        <label className="block">
          <span className="text-white font-medium">Start Time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={dateTimeLocalNow}
            className="mt-1 block w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      )}
    </div>
  );
}

interface ParticipantsInputProps {
  users: { email: string; userName: string }[];
  selectedParticipants: string[];
  setSelectedParticipants: (participants: string[]) => void;
  activeType: boolean;
  setActiveType: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
}

function ParticipantsInput({
  users,
  selectedParticipants,
  setSelectedParticipants,
  activeType,
  setActiveType,
  setShowModal,
}: ParticipantsInputProps) {
  console.log(selectedParticipants);

  return (
    <div className="block">
      <div className="text-white font-medium mb-2">Participants:</div>
      <div className="flex items-center gap-4 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={!activeType}
            onChange={() => {
              setActiveType(false);
              setSelectedParticipants([]);
            }}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-300">Anyone with the link</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={activeType}
            onChange={(e) => {
              setActiveType(e.target.checked);
              if (!e.target.checked) {
                setSelectedParticipants([]);
              }
              if (e.target.checked) setShowModal(true);
            }}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="text-gray-300">Private Meeting</span>
        </label>
      </div>
      {activeType && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-white">
              Selected Participants: {selectedParticipants?.length}
            </div>
            <FiEdit
              onClick={() => setShowModal(true)}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `http://localhost:3000/user/meeting/${call.id}`;

  return (
    <div className="mt-6 bg-gray-800 rounded-md p-4 w-full max-w-md">
      <h3 className="text-white font-semibold mb-2">Meeting Created Successfully!</h3>
      <p className="text-gray-300 break-all">
        Share this link with your participants:
      </p>
      <a
        href={meetingLink}
        className="text-indigo-400 underline mt-1 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {meetingLink}
      </a>
    </div>
  );
}
