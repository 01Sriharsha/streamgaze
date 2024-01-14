import { db } from "@/lib/prisma";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  // await new Promise(resolve => setTimeout(resolve , 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch {
    userId = null;
  }

  let users: User[] = [];

  if (userId) {
    //exclude the current logged in user
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
