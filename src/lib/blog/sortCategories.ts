import type { BlogCardProps } from "@/types/blog";
import type { BlogCategory } from "@/types/categories";

export function sortCategoriesByBlogCount(
  categories: BlogCategory[],
  blogs: BlogCardProps[],
): BlogCategory[] {
  const categoryCounts = new Map<number, number>();

  for (const blog of blogs) {
    for (const category of blog.categories) {
      categoryCounts.set(
        category.id,
        (categoryCounts.get(category.id) ?? 0) + 1,
      );
    }
  }

  return [...categories]
    .filter((category) => (categoryCounts.get(category.id) ?? 0) > 0)
    .sort(
      (a, b) =>
        (categoryCounts.get(b.id) ?? 0) -
        (categoryCounts.get(a.id) ?? 0),
    );
}