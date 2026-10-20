import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import Typography from "@/components/ui/Typography";
import BlogPostCategories from "./individual/BlogPostCategories";
import type { BlogCardProps } from "@/types/blog";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { formatDate } from "@/lib/utils";
import ImageReveal from "@/components/shared/ImageReveal";
import { allPages } from "@/constant/pages";

const FeaturedBlogCard = ({
  categories,
  title,
  excerpt,
  featuredImage,
  slug,
  publishedAt,
}: BlogCardProps) => {
  const blogUrl = slug ? `${allPages.blog.url}/${slug}` : "#";
  return (
    <article className="relative mb-4 w-full md:mb-0">
      <Link
        href={blogUrl}
        className="group relative block w-full"
        aria-label={`Read ${title}`}
      >
        {/* Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-secondary-backgound/60">
          {featuredImage && (
            <ImageReveal
              className="aspect-16/10"
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
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1279px) 100vw, 65vw"
              />
            </ImageReveal>
          )}

          {/* Desktop image gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-linear-to-t from-black/90 via-black/60 to-transparent md:block"
          />
        </div>

        {/* Mobile metadata */}
        <div className="mt-4 flex items-center justify-between border-b border-border pb-3 md:hidden">
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

        {/* Title + excerpt: rendered once.
            Mobile: in flow below the image.
            md+: absolutely positioned over the bottom of the image. */}
        <div className="md:absolute md:right-5 md:bottom-5 md:left-5 md:z-10 lg:right-6 lg:bottom-6 lg:left-6">
          <Typography
            variant="h3"
            className="mt-3 max-w-3xl md:mt-0 md:text-white"
          >
            {title}
          </Typography>

          {excerpt && (
            <Typography
              variant="body"
              className="mt-3 max-w-2xl text-foreground/60 md:text-white/75"
            >
              {excerpt}
            </Typography>
          )}

          {/* Mobile Read Story */}
          <div className="mt-7 inline-flex items-center gap-2 font-medium text-foreground transition-colors duration-300 group-hover:text-primary md:hidden">
            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            <span>Read Story</span>
          </div>

          {/* Desktop Read Story button */}
          <div className="mt-7 hidden md:block">
            <span className="group/button relative inline-flex items-center justify-center overflow-hidden bg-primary px-6 py-3 text-center text-sm font-medium uppercase text-primary-foreground transition-colors duration-300">
              <span className="relative z-10 transition-colors duration-300 group-hover/button:text-background">
                Read Story
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover/button:scale-x-100"
              />
            </span>
          </div>
        </div>
      </Link>

      {/* Featured badge */}
      <aside
        aria-label="Featured story"
        className="absolute top-5 right-5 z-20 inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground lg:top-6 lg:right-6"
      >
        <Star size={14} strokeWidth={1.8} aria-hidden="true" />
        <span>Featured</span>
      </aside>

      {/* Categories overlaid on the image */}
      <div className="absolute top-5 left-5 z-20 hidden md:block lg:top-6 lg:left-6">
        <BlogPostCategories
          categories={categories}
          variant="overlay"
          maxVisible={3}
        />
      </div>
    </article>
  );
};

export default FeaturedBlogCard;
