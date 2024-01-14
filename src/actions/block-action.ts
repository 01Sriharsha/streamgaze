"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unBlockUser } from "@/services/block-service";

export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);
  revalidatePath("/");

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
    return blockedUser;
  }
};

export const onUnblock = async (id: string) => {
  const unblockedUser = await unBlockUser(id);
  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
    return unblockedUser;
  }
};
