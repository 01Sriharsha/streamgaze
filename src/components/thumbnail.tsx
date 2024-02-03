import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";

type ThumbnailProps = {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
};

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  let content: JSX.Element;

  if (src) {
    content = (
      <Image
        src={src}
        alt={username}
        fill
        quality={50}
        className="object-cover bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    );
  } else {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <UserAvatar
          size={"lg"}
          showbadge
          isLive={isLive}
          imageUrl={fallback}
          username={username}
        />
      </div>
    );
  }
  return (
    <div className="group aspect-video rounded-md relative cursor-pointer">
      <div className="rounded-md inset-0 absolute bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      {content}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return <Skeleton className="aspect-video rounded-md" />;
};
