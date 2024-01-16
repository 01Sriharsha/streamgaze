import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/services/user-service";
import { currentUser } from "@clerk/nextjs";

type CreatorPageProps = {
  params: {
    username: string;
  };
};

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { username } = params;

  const loggedUser = await currentUser();

  const user = await getUserByUsername(username);

  if (!user || loggedUser?.id !== user.externalUserId || !user.Stream) {
    throw new Error("Unauthorized");
  }

  return <div className="h-full">
    <StreamPlayer user={user} stream={user.Stream} />
  </div>;
}
