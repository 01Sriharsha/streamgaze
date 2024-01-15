import { Button } from "@/components/ui/button";
import { UrlCard } from "./_components/url-card";
import { getSelfByUsername } from "@/services/auth-service";
import { getStreamByUserId } from "@/services/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

type KeysPageProps = {
  params: {
    username: string;
  };
};

export default async function KeysPage({
  params: { username },
}: KeysPageProps) {
  const self = await getSelfByUsername(username);
  const stream = await getStreamByUserId(self.id);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys and URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
