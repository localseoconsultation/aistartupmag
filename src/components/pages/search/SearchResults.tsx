import BlogCard from "@/components/ui/BlogCard";
import Typography from "@/components/ui/Typography";
import type { BlogCardProps } from "@/types/blog";

type SearchResultsProps = {
  results: BlogCardProps[];
  query: string;
  selectedCategory: string;
  totalDocs: number;
};

const SearchResults = ({
  results,
  query,
  selectedCategory,
  totalDocs,
}: SearchResultsProps) => {
  return (
    <section className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
      {/* Results heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <Typography variant="h2">
          {query
            ? `Results for "${query}"`
            : selectedCategory
              ? selectedCategory
              : "All Stories"}
        </Typography>

        <p className="text-sm text-foreground/60">
          {totalDocs} {totalDocs === 1 ? "story" : "stories"} found
        </p>
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-7 md:gap-y-16 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-20">
          {results.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-t border-border mt-8">
          <Typography variant="h3">No stories found.</Typography>

          <p className="mx-auto mt-3 max-w-md text-foreground/60">
            Try another keyword or select a different category to discover more
            stories.
          </p>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
