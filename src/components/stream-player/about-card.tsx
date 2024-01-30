"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-model";

type AboutCardProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount > 1 ? "Followers" : "Follower";

  return (
    <div className="px-4">
      <div className="group rounded-xl p-6 lg:p-10 flex flex-col gap-y-3 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex font-semibold text-lg 2xl:text-2xl items-center gap-x-2">
            <p>About {hostName}</p>
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>
          &nbsp;{followedByLabel}
        </div>
        <p className="text-sm">{bio || "No description"}</p>
      </div>
    </div>
  );
};
