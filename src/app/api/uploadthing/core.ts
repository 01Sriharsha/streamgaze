import { db } from "@/lib/prisma";
import { getSelf } from "@/services/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getSelf();
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const stream = await db.stream.update({
        where: {
          userId: metadata.userId,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });
      if (!stream) {
        throw new Error("Failed to upload image");
      }
      return { fileUrl: stream.thumbnailUrl };
    }),
} satisfies FileRouter;

export type File_Router = typeof fileRouter;