import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { VerifiedMark } from "@/components/verified-mark";

type SearchResultCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
};

export const SearchResultCard = ({
  data: { id, isLive, name: streamName, thumbnailUrl, updatedAt, user },
}: SearchResultCardProps) => {
  return (
    <Link href={`/${user.username}`} key={id}>
      <div className="w-full flex gap-x-4">
        <div className="relative w-[16rem] h-[9rem]">
          <Thumbnail
            src={thumbnailUrl}
            fallback={user.imageUrl}
            username={user.username}
            isLive={isLive}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold hover:text-blue-500">{user.username}</p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{streamName}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const SearchResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative w-[16rem] h-[9rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-[250px] rounded-md" />
        <Skeleton className="h-4 w-40 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
};
