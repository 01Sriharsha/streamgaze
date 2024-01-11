import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-red-500">
      Hello harsha
      <Button variant={"link"}>
        <Link href={"/sign-in"}>Sign In</Link>
      </Button>
      <Button variant={"link"}>
        <Link href={"/sign-up"}>Sign Up</Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
