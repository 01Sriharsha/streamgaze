import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { notFound } from "next/navigation";
import { FollowButton } from "./_components/follow-button";

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
  

  return (
    <div className="flex flex-col gap-y-4">
      User Page - {username}
      <p>{isFollowing ? "Following" : "Not following"}</p>
      <FollowButton userId={user.id} isFollowing={isFollowing} />
    </div>
  );
}
