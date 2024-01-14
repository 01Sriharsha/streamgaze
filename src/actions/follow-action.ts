"use server";

import { followUser, unFollowUser } from "@/services/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unfollowedUser = await unFollowUser(id);
    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
  } catch {
    throw new Error("Internal server error");
  }
};
