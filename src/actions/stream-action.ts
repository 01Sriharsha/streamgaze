"use server";

import { db } from "@/lib/prisma";
import { getSelf } from "@/services/auth-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });
    if (!selfStream) {
      throw new Error("cannot modify other's stream");
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelay: values.isChatDelay,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };
    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/u/${self.username}/chat`);

    return stream;
  } catch {
    throw new Error("Internal server error");
  }
};

export const removeThumbnail = async () => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });
    if (!selfStream) {
      throw new Error("cannot modify other's stream");
    }
    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        thumbnailUrl: null,
      },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal server error");
  }
};