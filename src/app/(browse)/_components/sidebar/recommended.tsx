"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type RecommenededProps = {
  data: User[];
};

export const Recommeneded = ({ data: users }: RecommenededProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && users.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm px-3">
        {showLabel && <span>Recommended</span>}
      </p>

      <ul>
        {users.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
