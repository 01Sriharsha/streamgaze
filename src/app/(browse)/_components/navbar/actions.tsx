import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-center gap-x-2">
      {!user ? (
        <SignInButton>
          <Button size='sm' variant={'primary'}>Sign In</Button>
        </SignInButton>
      ) : (
        <div className="flex justify-between gap-8 items-center">
          <Link
            href={`/${user.username}`}
            className="flex items-center gap-1 text-sm text-neutral-300"
          >
            <Clapperboard size={'1.1rem'} />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
