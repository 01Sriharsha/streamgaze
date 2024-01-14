"use client";

import { useOptimistic, useTransition } from "react";

import { onBlock, onUnblock } from "@/actions/block-action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type BlockButtonProps = {
  isBlocked: boolean;
  userId: string;
};

export const BlockButton = ({ isBlocked, userId }: BlockButtonProps) => {
  const [block, setBlock] = useOptimistic(isBlocked);

  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    setBlock(true);
    startTransition(() => {
      onBlock(userId)
        .then((res) => {
          toast.success(`Blocked - ${res?.blocked.username}`);
        })
        .catch((err) => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    setBlock(false);
    startTransition(() => {
      onUnblock(userId)
        .then((res) => {
          toast.success(`Unblocked - ${res?.blocked.username}`);
        })
        .catch((err) => toast.error("Something went wrong"));
    });
  };

  return (
    <div>
      <Button
        disabled={isPending}
        variant={block ? "default" : "destructive"}
        onClick={block ? handleUnblock : handleBlock}
      >
        {block ? "Unblock" : "Block"}
      </Button>
    </div>
  );
};
