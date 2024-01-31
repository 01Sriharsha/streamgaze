import { notFound } from "next/navigation";

import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { isBlockedUser } from "@/services/block-service";
import { StreamPlayer } from "@/components/stream-player";

type UserPageProps = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params;

  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer stream={user.Stream!} user={user} isFollowing={isFollowing} />
  );
}
