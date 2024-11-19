import React from "react";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import chatClient from "@/lib/streamChatConfig";
import { Card, IconButton } from "@mui/material";
import "stream-chat-react/dist/css/v2/index.css";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import "@/styles/chatbox.css";

interface ChatBoxProps {
  channel: any;
  close: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ channel, close }) => {
  if (!channel) return <div>Loading...</div>;
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
        <Chat client={chatClient} theme="str-chat__theme-dark">
          <Channel channel={channel}>
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
