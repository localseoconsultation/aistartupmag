import BlogCardSkeletonGrid from "@/components/skeleton/BlogCardSkeletonGrid";

const SearchResultsSkeleton = () => {
  return (
    <section className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
      {/* Results heading skeleton */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="mt-3 h-10 w-2/3 max-w-md animate-pulse bg-foreground/10 md:h-12" />

        <div className="h-4 w-28 animate-pulse bg-foreground/10" />
      </div>

      {/* Blog cards skeleton */}
      <BlogCardSkeletonGrid />
    </section>
  );
};

export default SearchResultsSkeleton;
