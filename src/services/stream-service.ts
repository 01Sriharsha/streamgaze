import { db } from "@/lib/prisma";

export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({
    where: { userId },
  });

  if (!stream) {
    throw new Error("something went wrong");
  }

  return stream;
};
