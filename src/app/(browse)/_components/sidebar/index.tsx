import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton, Recommeneded } from "./recommended";
import { getRecommended } from "@/services/recommended-service";
import { getFollowedUsers } from "@/services/follow-service";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
  const recommendedUsers = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommeneded data={recommendedUsers} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border border-[#2D2E35] z-50 gap-2">
      <ToggleSkeleton />
      <div className="flex flex-col space-y-6">
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </div>
    </aside>
  );
};
