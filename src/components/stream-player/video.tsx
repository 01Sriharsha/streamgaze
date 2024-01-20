import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";

type VideoProps = {
  hostName: string;
  hostIdentity: string;
};

export const Video = ({ hostIdentity, hostName }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === participant?.identity);

  console.log(tracks);

  function render() {
    if (!participant && connectionState === ConnectionState.Connected) {
      return <OfflineVideo username={hostName} />;
    } else if (!participant || tracks.length === 0) {
      return <LoadingVideo label={connectionState} />;
    } else {
      return <LiveVideo participant={participant} />;
    }
  }

  return <div className="aspect-video border-b group relative">{render()}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};