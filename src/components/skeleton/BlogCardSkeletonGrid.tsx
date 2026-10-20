import BlogCardSkeleton from "./BlogCardSkeleton";

type BlogCardSkeletonGridProps = {
  count?: number;
};

const BlogCardSkeletonGrid = ({ count = 6 }: BlogCardSkeletonGridProps) => {
  return (
    <div
      className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-7 md:gap-y-16 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-20"
      aria-label="Loading stories"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogCardSkeletonGrid;
