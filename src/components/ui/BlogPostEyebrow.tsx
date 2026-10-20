import Link from "next/link";

import Typography from "@/components/ui/Typography";
import type { BlogCardProps } from "@/types/blog";

type BlogPostEyebrowProps = {
  categories: BlogCardProps["categories"];
};

const BlogPostEyebrow = ({ categories }: BlogPostEyebrowProps) => {
  const category = categories[0];

  if (!category) {
    return null;
  }

  const categoryUrl = `/category/${category.slug}`;

  return (
    <Link href={categoryUrl} className="inline-flex">
      <Typography
        variant="eyebrow"
        className="text-primary hover:underline hover:underline-offset-2"
      >
        {category.name}
      </Typography>
    </Link>
  );
};

export default BlogPostEyebrow;
