import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const isBlockedUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (self.id === otherUser.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });
    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    return false;
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked");
  }

  const blocked = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: { blocked: true },
  });

  if (!blocked) {
    throw new Error("Something went wrong");
  }

  return blocked;
};

export const unBlockUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.id) {
    return false;
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblocked = await db.block.delete({
    where: { id: existingBlock.id },
    include: { blocked: true },
  });

  if (!unblocked) {
    throw new Error("Something went wrong");
  }

  return unblocked;
};
