import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

type NavItemProps = {
  route: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
  isActive: boolean;
};

export const NavItem = ({
  route: { href, icon: Icon, label },
  isActive,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <li>
      <Button
        variant={"ghost"}
        size="sm"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
      >
        <Link href={href} className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </Link>
      </Button>
    </li>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
