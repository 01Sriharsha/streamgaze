import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommeneded } from "./recommended";
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
