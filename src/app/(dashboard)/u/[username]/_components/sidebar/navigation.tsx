"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}/stream`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}`,
      icon: Users,
    },
  ];

//   if (!user?.username) {
//     return <NavigationSkeleton />;
//   }
  return (
    <ul className="space-y-2">
      {routes.map((route) => (
        <NavItem
          key={route.label}
          route={route}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};

export const NavigationSkeleton = () => {
  return (
    <ul className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <NavItemSkeleton key={i} />
      ))}
    </ul>
  );
};
