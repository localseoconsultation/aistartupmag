import Image from "next/image";

import Typography from "@/components/ui/Typography";
import BlogPostCategories from "./BlogPostCategories";
import BlogPostDetails from "./BlogPostDetails";
import type { BlogPost } from "@/types/blogContent";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { formatDate } from "@/lib/utils";

type BlogPostHeroProps = Pick<
  BlogPost,
  | "title"
  | "categories"
  | "publishedAt"
  | "readingTime"
  | "author"
  | "excerpt"
  | "featuredImage"
>;

const BlogPostHero = ({
  title,
  categories,
  publishedAt,
  readingTime,
  author,
  excerpt,
  featuredImage,
}: BlogPostHeroProps) => {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        {/* Categories */}
        <BlogPostCategories categories={categories} maxVisible={3} />

        {/* Title */}
        <Typography variant="display" className="mt-7 max-w-5xl">
          {title}
        </Typography>

        {/* Excerpt */}
        <Typography
          variant="bodyLarge"
          className="mt-7 max-w-3xl border-l border-border pl-4 text-foreground/70 md:pl-5"
        >
          {excerpt}
        </Typography>

        {/* Article Details */}
        <div className="mt-8">
          <BlogPostDetails
            author={author.name}
            publishedAt={formatDate(publishedAt)}
            readingTime={`${readingTime} min read`}
          />
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative mt-12 aspect-16/8 w-full overflow-hidden md:mt-16">
            <Image
              src={getPayloadImageUrl(featuredImage.url)}
              alt={featuredImage.alt || title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostHero;