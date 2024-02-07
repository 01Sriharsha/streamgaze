import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";

export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({
    where: { userId },
  });

  if (!stream) {
    throw new Error("something went wrong");
  }

  return stream;
};

export const getStreams = async () => {
  let streams = [];
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (userId) {
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
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        name: true,
        user: true,
        thumbnailUrl: true,
        isLive: true,
      },
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        name: true,
        user: true,
        thumbnailUrl: true,
        isLive: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }
  return streams;
};
