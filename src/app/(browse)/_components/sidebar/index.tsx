import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { RecommendedSkeleton, Recommeneded } from "./recommended";
import { getRecommended } from "@/services/recommended-service";

export const Sidebar = async () => {
  const recommendedUsers = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommeneded data={recommendedUsers} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border border-[#2D2E35] z-50">
      <RecommendedSkeleton />
    </aside>
  );
};
