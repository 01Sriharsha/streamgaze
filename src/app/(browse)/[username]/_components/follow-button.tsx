"use client";

import { onFollow, onUnFollow } from "@/actions/follow-action";
import { Button } from "@/components/ui/button";
import { useOptimistic, useTransition } from "react";

type FollowButtonProps = {
  isFollowing: boolean;
  userId: string;
};

export const FollowButton = ({ isFollowing, userId }: FollowButtonProps) => {
  const [following, setFollowing] = useOptimistic(isFollowing);

  const [isPending, startTransition] = useTransition();

  const handleFollow = async () => {
    setFollowing(true);
    startTransition(async () => await onFollow(userId));
  };

  const handleUnFollow = async () => {
    setFollowing(false);
    startTransition(async () => await onUnFollow(userId));
  };

  return (
    <div>
      <Button
        disabled={isPending}
        variant={following ? "destructive" : "primary"}
        onClick={isFollowing ? handleUnFollow : handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};
