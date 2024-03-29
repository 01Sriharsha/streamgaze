import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self?.id) {
    throw new Error("You cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already Following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id || "",
      followingId: otherUser.id,
    },
    include: { following: true },
  });

  return follow;
};

export const unFollowUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self?.id) {
    throw new Error("You cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not Following");
  }

  const deletedFollow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: { following: true },
  });

  if (!deletedFollow) {
    throw new Error("Failed to unfollow");
  }

  return deletedFollow;
};

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          Blocked: {
            none: {
              blockerId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            Stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return followers;
  } catch {
    return [];
  }
};
