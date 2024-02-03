import { Suspense } from "react";
import { StreamsGrid, StreamsGridSkeleton } from "./_components/streams-grid";

export default async function Home() {
  return (
    <main className="h-full p-8 max-w-screen-xl mx-auto">
      <Suspense fallback={<StreamsGridSkeleton />}>
        <StreamsGrid />
      </Suspense>
    </main>
  );
}
