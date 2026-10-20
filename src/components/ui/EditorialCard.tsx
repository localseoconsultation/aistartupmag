import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Typography from "@/components/ui/Typography";

type EditorialCardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  exploreLabel: string;
};

const EditorialCard = ({
  title,
  description,
  image,
  url,
  exploreLabel,
}: EditorialCardProps) => {
  return (
    <Link href={url} className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/15"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-5">
        <Typography variant="h3">{title}</Typography>

        <Typography
          variant="body"
          className="mt-4 max-w-md font-medium text-foreground/80"
        >
          {description}
        </Typography>

        {/* Explore */}
        <div className="mt-auto inline-flex w-fit items-center gap-2 pt-8 font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          <ArrowUpRight
            size={20}
            strokeWidth={1.6}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />

          <span>{exploreLabel}</span>
        </div>
      </div>
    </Link>
  );
};

export default EditorialCard;
