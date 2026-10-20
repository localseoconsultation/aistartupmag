"use client";

import { useRef, useState } from "react";

import FilterBlogs from "./FilterBlogs";
import BlogCard from "@/components/ui/BlogCard";
import LoadMoreButton from "@/components/ui/LoadMoreButton";

import type { BlogCategory } from "@/types/categories";
import type { BlogCardProps } from "@/types/blog";
import { loadMore } from "@/lib/blog/loadMore";
import BlogCardSkeletonGrid from "@/components/skeleton/BlogCardSkeletonGrid";

type AllPostsProps = {
  categories: BlogCategory[];
  blogs: BlogCardProps[];
  hasNextPage: boolean;
  nextPage: number | null;
  category?: string;
};

const AllPosts = ({
  categories,
  blogs: initialBlogs,
  hasNextPage: initialHasNextPage,
  nextPage: initialNextPage,
  category,
}: AllPostsProps) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category ?? null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [nextPage, setNextPage] = useState(initialNextPage);

  // Prevent older requests from overwriting newer results.
  const requestId = useRef(0);

  const handleCategoryChange = async (selectedCategory: string | null) => {
    if (category) return;

    setActiveCategory(selectedCategory);
    setIsLoading(true);
    setBlogs([]);
    setHasNextPage(false);
    setNextPage(null);

    const currentRequestId = ++requestId.current;

    try {
      const data = await loadMore<BlogCardProps>(
        "/api/blogs",
        1,
        selectedCategory ? { category: selectedCategory } : undefined,
      );

      // Ignore results from an outdated category request.
      if (currentRequestId !== requestId.current) return;

      setBlogs(data.docs);
      setHasNextPage(data.hasNextPage);
      setNextPage(data.nextPage);
    } catch (error) {
      if (currentRequestId !== requestId.current) return;

      console.error("Failed to filter blogs:", error);
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  };

  const handleLoadMore = async () => {
    if (isLoading || !hasNextPage || !nextPage) return;

    setIsLoading(true);

    const currentRequestId = ++requestId.current;

    // Category pages use their route category.
    // The main blog page uses the selected filter.
    const selectedCategory = category ?? activeCategory;

    try {
      const data = await loadMore<BlogCardProps>(
        "/api/blogs",
        nextPage,
        selectedCategory ? { category: selectedCategory } : undefined,
      );

      if (currentRequestId !== requestId.current) return;

      setBlogs((currentBlogs) => {
        const existingIds = new Set(currentBlogs.map((blog) => blog.id));

        return [
          ...currentBlogs,
          ...data.docs.filter((blog) => !existingIds.has(blog.id)),
        ];
      });

      setHasNextPage(data.hasNextPage);
      setNextPage(data.nextPage);
    } catch (error) {
      if (currentRequestId !== requestId.current) return;

      console.error("Failed to load more blogs:", error);
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="px-5 pb-20 md:px-8 md:pb-26 lg:pb-36">
      {/* Filters appear only on the main blog page */}
      {!category && (
        <div className="sticky top-0 z-40 bg-background">
          <FilterBlogs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* Blog grid */}
      {isLoading && blogs.length === 0 ? (
        <BlogCardSkeletonGrid />
      ) : blogs.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-7 md:gap-y-16 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-20">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center">No stories found in this category.</p>
      )}

      {/* Pagination */}
      {hasNextPage && (
        <div className="mt-14 flex justify-center md:mt-16 lg:mt-20">
          <LoadMoreButton
            title="Load More Stories"
            onClick={handleLoadMore}
            isLoading={isLoading}
            variant="default"
          />
        </div>
      )}
    </section>
  );
};

export default AllPosts;
