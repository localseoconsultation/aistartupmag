import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Typography from "@/components/ui/Typography";
import BlogPostEyebrow from "@/components/ui/BlogPostEyebrow";
import type { BlogCardProps } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { allPages } from "@/constant/pages";
import ImageReveal from "@/components/shared/ImageReveal";

const FeaturedBlogsListItem = ({
  categories,
  title,
  excerpt,
  featuredImage,
  slug,
  publishedAt,
}: BlogCardProps) => {
  const blogUrl = slug ? `${allPages.blog.url}/${slug}` : "#";

  return (
    <article className="xl:border-b xl:border-border xl:pb-5 xl:mb-5 xl:last:pb-0 xl:last:mb-0 xl:last:border-0">
      <div className="flex h-full flex-col xl:block">
        {/* Image: visible below XL */}
        <Link
          href={blogUrl}
          className="group/image relative block aspect-3/2 w-full overflow-hidden bg-background xl:hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          {featuredImage && (
            <ImageReveal
              className="aspect-3/2 bg-secondary-backgound/60"
              overlay={
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
              }
            >
              <Image
                src={getPayloadImageUrl(featuredImage.url)}
                alt={featuredImage.alt || title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.02]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </ImageReveal>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col items-start">
          {/* Metadata: visible below XL */}
          <div className="mt-4 flex w-full items-center justify-between border-b border-border pb-3 xl:hidden">
            <Typography
              variant="eyebrow"
              className="transition-colors duration-300 group-hover:text-primary"
            >
              {categories[0]?.name}
            </Typography>

            {publishedAt && (
              <Typography
                variant="caption"
                className="text-[13px] font-medium text-foreground/55"
              >
                {formatDate(publishedAt)}
              </Typography>
            )}
          </div>

          {/* Metadata: visible at XL and above */}
          <div className="hidden xl:block">
            <BlogPostEyebrow categories={categories} />
          </div>

          {/* Title and excerpt */}
          <Link
            href={blogUrl}
            className="group/story mt-4 block w-full xl:mt-2"
            aria-label={`Read ${title}`}
          >
            <Typography
              variant="h3"
              className="line-clamp-2 transition-colors duration-300 group-hover/story:text-foreground/75"
            >
              {title}
            </Typography>

            {excerpt && (
              <Typography
                variant="excerpt"
                className="mt-3 line-clamp-2 text-foreground/70 xl:mt-2"
              >
                {excerpt}
              </Typography>
            )}

            {/* Read Story: visible below XL */}
            <div className="mt-auto pt-6 xl:hidden">
              <div className="inline-flex items-center gap-2 font-medium text-foreground transition-colors duration-300 group-hover/story:text-primary">
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/story:translate-x-1 group-hover/story:-translate-y-1"
                />
                <span>Read Story</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedBlogsListItem;
