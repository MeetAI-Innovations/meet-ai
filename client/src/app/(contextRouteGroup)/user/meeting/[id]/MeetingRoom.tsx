"use client";
import { cn } from "@/lib/utils";
import "regenerator-runtime/runtime";
import "@/styles/globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutGrid,
  LayoutList,
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "@/components/ui/EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  console.log(callingState);

  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const micState = async () => {
    console.log(`Microphone is ${isMute ? "off" : "on"}`);
  };

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const getText = async () => {
    try {
      const startListening = () =>
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-IN",
        });
      if (!browserSupportsSpeechRecognition) {
        return null;
      }
      if (isMute) {
        startListening();
        resetTranscript();
      }
    } catch (error) {
      console.log(error);
    }
    console.log(`A:` + transcript);
  };

  useEffect(() => {
    micState();
    try {
      if (isMute) {
        getText();
      } else {
        SpeechRecognition.stopListening;
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetTranscript();
    }
  }, [microphone, isMute]);

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  if (callingState !== CallingState.JOINED) {
    return <div className="mx-auto animate-spin">Loading...</div>;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px]">
          <CallLayout />
        </div>

        <div
          className={cn(
            "h-[calc(100vh-86px)] ml-2 p-5 transition-all duration-300",
            showParticipants ? "block" : "hidden"
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        {/* Dropdown for Layout Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {[
              { label: "Grid", icon: <LayoutGrid size={16} /> },
              {
                label: "Speaker-Left",
                icon: <BetweenHorizonalEnd size={16} />,
              },
              {
                label: "Speaker-Right",
                icon: <BetweenVerticalEnd size={16} />,
              },
            ].map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer flex items-center gap-2"
                onClick={() =>
                  setLayout(
                    item.label.toLowerCase().replace(" ", "-") as CallLayoutType
                  )
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Button to show/hide participants list */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
