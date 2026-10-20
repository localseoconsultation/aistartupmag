// homepage slider

import Image from "next/image";
import Link from "next/link";

import Typography from "@/components/ui/Typography";
import type { BlogCardProps } from "@/types/blog";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { allPages } from "@/constant/pages";

type FeaturedBlogCardProps = BlogCardProps & {
  index: number;
  total: number;
};

const FeaturedBlogCard = ({
  categories,
  title,
  excerpt,
  featuredImage,
  slug,
  index,
  total,
}: FeaturedBlogCardProps) => {
  return (
    <Link href={`${allPages.blog.url}/${slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {featuredImage && (
          <Image
            src={getPayloadImageUrl(featuredImage.url)}
            alt={featuredImage.alt || title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 420px, 100vw"
          />
        )}
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-center justify-between border-b border-border pb-3 text-primary">
        <Typography variant="eyebrow">{categories[0]?.name}</Typography>

        <span className="text-xs font-semibold tracking-wide">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="pt-4 min-h-38">
        <Typography variant="h3" className="line-clamp-2 max-w-3xl">
          {title}
        </Typography>

        <Typography
          variant="excerpt"
          className="mt-2 line-clamp-2 font-medium text-foreground/80"
        >
          {excerpt}
        </Typography>
      </div>
    </Link>
  );
};

export default FeaturedBlogCard;
