import Link from "next/link";
import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

type StreamCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
  };
};

export const StreamCard = ({
  data: { id, name: streamName, isLive, thumbnailUrl, user },
}: StreamCardProps) => {
  return (
    <Link href={`/${user.username}`} key={id}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={thumbnailUrl}
          fallback={user.imageUrl}
          isLive={isLive}
          username={user.username}
        />
        <div className="flex gap-x-3 items-center">
          <UserAvatar
            imageUrl={user.imageUrl}
            isLive={isLive}
            username={user.username}
          />
          <div className="flex flex-col space-y-1 text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {streamName}
            </p>
            <p className="text-muted-foreground">{user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const StreamCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3 items-center">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
};
