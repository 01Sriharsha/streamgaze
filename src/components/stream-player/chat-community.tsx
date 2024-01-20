import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useParticipants } from "@livekit/components-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./chat-community-item";

type ChatCommunityProps = {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
};

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const participants = useParticipants();

  const [value, setValue] = useState("");

  const deboauncedValue = useDebounce(value, 500);

  const onChange = (str: string) => {
    setValue(str);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) =>
      participant.name?.toLowerCase().includes(deboauncedValue.toLowerCase())
    );
  }, [participants, deboauncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">Community is disabled</p>
      </div>
    );
  }
  return (
    <div>
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border border-white-10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block">
          No Results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
