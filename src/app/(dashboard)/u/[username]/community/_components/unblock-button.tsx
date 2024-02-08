"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { onUnblock } from "@/actions/block-action";

type UnblockButtonProps = {
  userId: string;
};

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(() => {
          toast.success("Unblocked!");
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };
  return (
    <Button size={"sm"} disabled={isPending} onClick={handleUnblock}>
      Unblock
    </Button>
  );
};
