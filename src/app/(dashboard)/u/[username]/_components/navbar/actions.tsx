import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export const Actions = () => {
  return (
    <div className="flex justify-between gap-8 items-center">
      <Link
        href={`/`}
        className="flex items-center gap-2 text-sm text-neutral-300"
      >
        <LogOut size={"1.1rem"} />
        <span className="hidden md:block">Exit</span>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
