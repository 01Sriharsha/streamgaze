import { notFound } from "next/navigation";

import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { FollowButton } from "./_components/follow-button";
import { BlockButton } from "./_components/block-button";
import { isBlockedUser } from "@/services/block-service";

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

  return (
    <div className="flex flex-col gap-y-4">
      User Page - {username}
      <p>{isFollowing ? "Following" : "Not following"}</p>
      <p>{isBlocked ? "Blocked" : "Not Blocked"}</p>
      <div className="flex items-center gap-6">
        <FollowButton userId={user.id} isFollowing={isFollowing} />
        <BlockButton userId={user.id} isBlocked={isBlocked} />
      </div>
    </div>
  );
}
