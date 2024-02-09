import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/services/search-service";
import {
  SearchResultCard,
  SearchResultCardSkeleton,
} from "./search-result-card";

type SearchResultsProps = {
  term: string;
};

export const SearchResults = async ({ term }: SearchResultsProps) => {
  const results = await getSearch(term);
  console.log({results});
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h2>
      {results.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searching for something else
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {results.map((result) => (
          <SearchResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-6 w-[350px] rounded-md mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <SearchResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
