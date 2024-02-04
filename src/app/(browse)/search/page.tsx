import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  SearchResults,
  SearchResultsSkeleton,
} from "./_components/search-results";

type SearchPageProps = {
  searchParams: {
    term?: string;
  };
};

export default function SearchPage({
  searchParams: { term },
}: SearchPageProps) {
  console.log(term);

  if (!term) {
    redirect("/");
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl m-auto">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults term={term} />
      </Suspense>
    </div>
  );
}
