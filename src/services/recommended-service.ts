import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";
import { Stream, User } from "@prisma/client";

export const getRecommended = async () => {
  // await new Promise(resolve => setTimeout(resolve , 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    //exclude the current logged in user
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              Blocked: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        Stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        Stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
