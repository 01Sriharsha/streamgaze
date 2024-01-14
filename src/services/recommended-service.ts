import { db } from "@/lib/prisma";

export const getRecommended = async () => {

  // await new Promise(resolve => setTimeout(resolve , 5000));

  const users = db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
