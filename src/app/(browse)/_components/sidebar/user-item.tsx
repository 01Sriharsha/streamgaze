import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";

type UserItemProps = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

export const UserItem = ({ imageUrl, username, isLive }: UserItemProps) => {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;

  const isActive = pathname === href;

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
      asChild
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={isLive}
            size={"default"}
            //showbadge
          />
          {!collapsed && <p>{username}</p>}
          {!collapsed && isLive && <LiveBadge classname="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 py-2 px-3">
      <Skeleton className={cn("min-h-[32px] min-w-[32px] rounded-full")} />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
