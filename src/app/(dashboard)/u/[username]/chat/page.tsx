import { getSelfByUsername } from "@/services/auth-service";
import { getStreamByUserId } from "@/services/stream-service";
import { redirect } from "next/navigation";
import { ToggleCard } from "./_components/toggle-card";

type ChatPageProps = {
  params: {
    username: string;
  };
};

export default async function ChatPage({
  params: { username },
}: ChatPageProps) {
  const user = await getSelfByUsername(username);

  if (!user) {
    redirect("/");
  }

  const stream = await getStreamByUserId(user.id);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
        <h3>Welcome, {username}</h3>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelay"
          label="Delay Chat"
          value={stream.isChatDelay}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Followers Only Chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
