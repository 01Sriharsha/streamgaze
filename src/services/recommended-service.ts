import { db } from "@/lib/prisma";

export const getRecommended = async () => {
  const users = db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
