"use client";

import { Stream, User } from "@prisma/client";
import { useViewerToken } from "@/hooks/use-viwer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";

type StreamPlayerProps = {
  user: User;
  stream: Stream;
  isFollowing?: boolean;
};

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar((state) => state);

  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }
  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
      token={token}
      connect
      className={cn(
        "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 h-full",
        collapsed && "lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-2" , "border border-white"
      )}
    >
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-5 lg:overflow-y-auto pb-10 border border-white">
        <Video hostName={user.username} hostIdentity={user.id} />
      </div>

      <div className={cn("col-span-1", collapsed && "hidden")}>
        <Chat
          viwerName={name}
          hostname={user.username}
          hostIdentity={user.id}
          isFollowing={isFollowing!}
          isChatEnabled={stream.isChatEnabled}
          isChatDelay={stream.isChatDelay}
          isChatFollowersOnly={stream.isChatFollowersOnly}
        />
      </div>
    </LiveKitRoom>
  );
};
