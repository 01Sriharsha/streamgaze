import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

type AvatarSizes = VariantProps<typeof avatarSizes>;
interface UserAvatarProps extends AvatarSizes {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showbadge?: boolean;
}

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  showbadge,
  size,
}: UserAvatarProps) => {
  const showBadge = showbadge && isLive;

  return (
    <div>
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username.charAt(0).toUpperCase() +
            username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

//skeleton
export const UserAvatarSkeleton = ({ size }: AvatarSizes) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};