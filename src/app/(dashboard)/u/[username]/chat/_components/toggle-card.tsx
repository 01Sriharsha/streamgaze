"use client";

import { updateStream } from "@/actions/stream-action";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelay" | "isChatFollowersOnly";

type ToggleCardProps = {
  label: string;
  value: boolean;
  field: FieldTypes;
};

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [] = useOptimistic(value);

  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success(`Chat Setting Updated`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            checked={value}
            onCheckedChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
