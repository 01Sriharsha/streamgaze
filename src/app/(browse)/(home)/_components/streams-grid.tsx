import { Skeleton } from "@/components/ui/skeleton";
import { getStreams } from "@/services/stream-service";
import { StreamCard, StreamCardSkeleton } from "./stream-card";

export const StreamsGrid = async () => {
  const streams = await getStreams();

  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {streams.length === 0 && (
        <p className="text-muted-foreground text-sm">No streams available!</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {streams.map((stream) => (
          <StreamCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const StreamsGridSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-6 w-[250px] rounded-md mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {[...Array(4)].map((_, i) => (
          <StreamCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
