"use client";

import { onFollow, onUnFollow } from "@/actions/follow-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type ActionsProps = {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
};

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth();

  const [isPending, startTransititon] = useTransition();

  const handleFollow = () => {
    if (!userId) redirect("/");

    if (!isHost) return;

    if (isFollowing) {
      startTransititon(() => {
        onFollow(hostIdentity)
          .then(() => toast.success("Followed!"))
          .catch(() => toast.error("Something went wrong!"));
      });
    } else {
      startTransititon(() => {
        onUnFollow(hostIdentity)
          .then(() => toast.success("Unfollowed!"))
          .catch(() => toast.error("Something went wrong!"));
      });
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      variant={"primary"}
      size="sm"
      className="w-full lg:w-auto"
      onClick={handleFollow}
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing && "fill-white")} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
