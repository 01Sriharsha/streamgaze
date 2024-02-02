"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p className="text-2xl">Oops! Something went wrong!</p>
      <Button variant={"primary"} size={"sm"} asChild>
        <Link href="/" replace>Go Back Home</Link>
      </Button>
    </div>
  );
}
