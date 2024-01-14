"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  const [isClient, setIsclient] = useState(false);

  useEffect(() => {
    setIsclient(true);
  }, []);

  if (!isClient) return null; //to avoid hydration
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border border-[#202E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
