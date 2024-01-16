"use client";

import { useViewerToken } from "@/hooks/use-viwer-token";
import { Stream, User } from "@prisma/client";

type StreamPlayerProps = {
  user: User;
  stream: Stream | null;
  isFollowing?: boolean;
};

export const StreamPlayer = ({ user, stream }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  console.log({ token, name, identity });

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }
  return <div>You can watch the stream</div>;
};
