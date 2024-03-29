import { ReceivedChatMessage } from "@livekit/components-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage } from "./chat-message";

type ChatListProps = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Skeleton className="w-1/2 h-6"/>
    </div>
  )
}