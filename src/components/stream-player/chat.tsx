"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

type ChatProps = {
  viewerName: string;
  hostname: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelay: boolean;
  isChatFollowersOnly: boolean;
};
export const Chat = ({
  viewerName,
  hostname,
  hostIdentity,
  isFollowing,
  isChatDelay,
  isChatEnabled,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width:1024px)");

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const { chatMessages: messages, isSending, send } = useChat();
  const { variant, onExpand } = useChatSidebar((state) => state);

  const [value, setValue] = useState("");

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reveresedMessages = useMemo(() => {
    //sorting messages in descending order
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const handleChange = (str: string) => {
    setValue(str);
  };

  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };

  return (
    <div className="flex flex-col bg-background border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reveresedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={handleChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isFollowing={isFollowing}
            isChatDelay={isChatDelay}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostname}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
