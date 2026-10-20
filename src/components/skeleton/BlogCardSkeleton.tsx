const BlogCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col animate-pulse">
      {/* Image — matches BlogCard aspect ratio */}
      <div className="relative aspect-3/2 w-full overflow-hidden bg-muted/40" />

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Meta */}
        <div className="mt-4 flex items-center justify-between border-b border-border pb-3">
          {/* Category */}
          <div className="h-3 w-24 rounded-sm bg-muted/40" />

          {/* Date */}
          <div className="h-3 w-20 rounded-sm bg-muted/40" />
        </div>

        {/* Text */}
        <div className="pt-4">
          {/* Title — two lines */}
          <div className="space-y-2">
            <div className="h-5 w-full rounded-sm bg-muted/40" />
            <div className="h-5 w-3/4 rounded-sm bg-muted/40" />
          </div>

          {/* Excerpt — two lines */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded-sm bg-muted/20" />
            <div className="h-4 w-5/6 rounded-sm bg-muted/20" />
          </div>
        </div>

        {/* Read Story */}
        <div className="mt-auto pt-7">
          <div className="h-4 w-24 rounded-sm bg-muted/40" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
