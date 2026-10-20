import Link from "next/link";

import Typography from "@/components/ui/Typography";
import type { BlogCardProps } from "@/types/blog";

type BlogPostCategoriesProps = {
  categories: BlogCardProps["categories"];
  variant?: "default" | "overlay";
  maxVisible?: number;
};

const BlogPostCategories = ({
  categories,
  variant = "default",
  maxVisible = 2,
}: BlogPostCategoriesProps) => {
  const isOverlay = variant === "overlay";

  const visibleCategories = categories.slice(0, maxVisible);
  const remainingCount = Math.max(categories.length - maxVisible, 0);

  const getCategoryUrl = (slug: string) => `/category/${slug}`;

  const categoryClassName = [
    "group inline-flex items-center border px-3 py-1.5",
    "transition-colors duration-300",
    isOverlay
      ? "border-white/40 bg-black/20 backdrop-blur-sm hover:border-primary hover:bg-primary"
      : "border-border hover:border-primary hover:bg-primary",
  ].join(" ");

  const textClassName = [
    "font-medium uppercase tracking-[0.08em]",
    "transition-colors duration-300",
    isOverlay
      ? "text-white/90 group-hover:text-primary-foreground"
      : "text-foreground/70 group-hover:text-primary-foreground",
  ].join(" ");

  return (
    <div className="flex flex-wrap items-center gap-4">
      {visibleCategories.map((category) => (
        <Link
          key={category.id}
          href={getCategoryUrl(category.slug)}
          className={categoryClassName}
        >
          <Typography variant="caption" className={textClassName}>
            {category.name}
          </Typography>
        </Link>
      ))}

      {remainingCount > 0 && (
        <span
          className={[
            "inline-flex items-center border px-3 py-1.5",
            "font-medium uppercase tracking-[0.08em]",
            isOverlay
              ? "border-white/40 bg-black/20 text-white/70 backdrop-blur-sm"
              : "border-border text-foreground/50",
          ].join(" ")}
        >
          <Typography variant="caption" className="font-medium">
            +{remainingCount} more
          </Typography>
        </span>
      )}
    </div>
  );
};

export default BlogPostCategories;
