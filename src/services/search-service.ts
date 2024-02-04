import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const getSearch = async (term: string) => {
  let userId;
  let streams = [];

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (!userId) {
    streams = await db.stream.findMany({
      where: {
        //search by stream name or username
        OR: [
          {
            name: {
              contains: term,
            },
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        name: true,
        id: true,
        isLive: true,
        thumbnailUrl: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            Blocked: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        //search by stream name or username
        OR: [
          {
            name: {
              contains: term,
            },
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        name: true,
        id: true,
        isLive: true,
        thumbnailUrl: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }

  return streams;
};
