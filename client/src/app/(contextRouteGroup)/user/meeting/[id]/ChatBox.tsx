import React from "react";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { Card, IconButton } from "@mui/material";
import "stream-chat-react/dist/css/v2/index.css";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import "@/styles/chatbox.css";
import { Loader2 } from "lucide-react";

interface ChatBoxProps {
  close: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ close }) => {
  if (!channel)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-indigo-500" size={50} />
      </div>
    );
  return (
    <div className="relative z-40 h-full w-full p-4 bg-black">
      <IconButton
        onClick={() => close(false)}
        className="sm:relative lg:hidden bg-black sm:visible hidden z-50"
      >
        <CrossCircledIcon
          width="2rem"
          height="2rem"
          color="#fff"
          cursor="pointer"
        />
      </IconButton>
      <Card className="card w-full h-full max-w-lg bg-black text-white shadow-lg rounded-lg overflow-hidden">
        <Chat client={} theme="str-chat__theme-dark">
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <div className="lg:pb-20">
                <MessageInput />
              </div>
            </Window>
          </Channel>
        </Chat>
      </Card>
    </div>
  );
};

export default ChatBox;
