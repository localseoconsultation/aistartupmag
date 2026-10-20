import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Typography from "@/components/ui/Typography";
import ImageReveal from "@/components/shared/ImageReveal";
import type { BlogCardProps } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { allPages } from "@/constant/pages";

const BlogCard = ({
  title,
  excerpt,
  categories,
  featuredImage,
  slug,
  publishedAt,
}: BlogCardProps) => {
  return (
    <Link
      href={slug ? `${allPages.blog.url}/${slug}` : "#"}
      className="group flex h-full flex-col"
      aria-label={`Read ${title}`}
    >
      {/* Image */}
      <ImageReveal
        className="aspect-3/2 bg-background"
        overlay={
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        }
      >
        {featuredImage && (
          <Image
            src={getPayloadImageUrl(featuredImage.url)}
            alt={featuredImage.alt || title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        )}
      </ImageReveal>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Meta */}
        <div className="mt-4 flex items-center justify-between border-b border-border pb-3">
          <Typography
            variant="eyebrow"
            className="transition-colors duration-300 group-hover:text-primary"
          >
            {categories[0]?.name}
          </Typography>

          {publishedAt && (
            <Typography
              variant="caption"
              className="text-foreground/55 font-medium text-[13px]"
            >
              {formatDate(publishedAt)}
            </Typography>
          )}
        </div>

        {/* Text */}
        <div className="pt-4">
          <Typography
            variant="h3"
            className="line-clamp-2 transition-colors duration-300 group-hover:text-foreground/75"
          >
            {title}
          </Typography>

          {excerpt && (
            <Typography
              variant="excerpt"
              className="mt-3 line-clamp-2 text-foreground/70"
            >
              {excerpt}
            </Typography>
          )}
        </div>

        {/* Read Story */}
        <div className="mt-auto pt-7">
          <div className="inline-flex items-center gap-2 font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

            <span>Read Story</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
