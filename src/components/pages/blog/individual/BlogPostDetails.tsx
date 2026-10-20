import Typography from "@/components/ui/Typography";

type BlogPostDetailsProps = {
  author: string;
  publishedAt: string;
  readingTime: string;
  theme?: "default" | "overlay";
};

const BlogPostDetails = ({
  author,
  publishedAt,
  readingTime,
  theme = "default",
}: BlogPostDetailsProps) => {
  const isOverlay = theme === "overlay";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Author */}
      <div className="order-2 flex items-center gap-2.5 sm:order-1">
        <div
          aria-hidden="true"
          className={`flex size-7 shrink-0 items-center justify-center text-[12px] font-medium uppercase ${
            isOverlay
              ? "bg-white text-foreground"
              : "bg-foreground text-background"
          }`}
        >
          {author.charAt(0)}
        </div>

        <Typography
          variant="small"
          className={isOverlay ? "font-medium text-white" : "font-medium"}
        >
          {author}
        </Typography>

        {/* Desktop Separator */}
        <span
          aria-hidden="true"
          className={`ml-0.5 hidden size-1 rounded-full sm:block ${
            isOverlay ? "bg-white/30" : "bg-foreground/25"
          }`}
        />
      </div>

      {/* Reading Time + Date */}
      <div className="order-1 flex items-center gap-3 sm:order-3">
        <Typography
          variant="small"
          className={isOverlay ? "text-white/65" : "text-foreground/55"}
        >
          {readingTime}
        </Typography>

        <span
          aria-hidden="true"
          className={`size-1 rounded-full ${
            isOverlay ? "bg-white/30" : "bg-foreground/25"
          }`}
        />

        <Typography
          variant="small"
          className={isOverlay ? "text-white/65" : "text-foreground/55"}
        >
          {publishedAt}
        </Typography>
      </div>
    </div>
  );
};

export default BlogPostDetails;
