import { db } from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      Stream: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      Stream: true,
    },
  });
  return user;
};
