"use server";

import { User } from "@prisma/client";
import { db } from "@/lib/prisma";
import { getSelf } from "@/services/auth-service";
import { revalidatePath } from "next/cache";

export async function updateUser(values: Partial<User>) {
  try {
    const self = await getSelf();

    const validData: Partial<User> = {
      bio: values.bio,
    };

    const user = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        ...validData,
      },
    });

    if (!user) {
      throw new Error("Failed to update the user");
    }

    revalidatePath(`/u/${self.username}`)
  } catch {
    throw new Error("Internal Error");
  }
}
