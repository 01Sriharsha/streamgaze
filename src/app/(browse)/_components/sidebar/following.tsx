"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type FollowingProps = {
  data: (Follow & {
    following: User & {
      Stream: {
        isLive: boolean;
      } | null;
    };
  })[];
};

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (data.length == 0) {
    return null;
  }
  return (
    <div>
      {!collapsed && (
        <div className="px-3 pt-2">
          <p className="text-muted-foreground text-sm">Following</p>
        </div>
      )}
      <ul className="mt-2">
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            imageUrl={follow.following.imageUrl}
            username={follow.following.username}
            isLive={follow.following.Stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
