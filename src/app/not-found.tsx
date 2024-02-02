import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t found the resource you&apos;re looking for!</p>
      <Button variant={"primary"} size={"sm"} asChild>
        <Link href="/" replace>Go Back Home</Link>
      </Button>
    </div>
  );
}
