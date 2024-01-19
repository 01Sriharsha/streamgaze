import { ReceivedChatMessage } from "@livekit/components-react";

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

  return <div>ChatList</div>;
};
