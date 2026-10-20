"use client";

import CategoryHero from "./CategoryHero";
import AllPosts from "../blog/AllPosts";

import type { BlogCategory } from "@/types/categories";
import type { BlogCardProps } from "@/types/blog";

type CategoryContentProps = {
  category: BlogCategory;
  blogs: BlogCardProps[];
  hasNextPage: boolean;
  nextPage: number | null;
};

const CategoryContent = ({
  category,
  blogs,
  hasNextPage,
  nextPage,
}: CategoryContentProps) => {
  return (
    <>
      <CategoryHero title={category.name} description={category.description} />

      {/* <FeaturedImage /> */}

      <AllPosts
        categories={[]}
        blogs={blogs}
        hasNextPage={hasNextPage}
        nextPage={nextPage}
        category={category.slug}
      />
    </>
  );
};

export default CategoryContent;
