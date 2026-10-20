const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div aria-hidden="true" className={`bg-muted/40 ${className}`} />
);

const BlogPostSkeleton = () => {
  return (
    <main aria-label="Loading blog post" aria-busy="true">
      <article className="px-5 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28 lg:pt-24 lg:pb-36">
        <div className="mx-auto max-w-310">
          {/* Categories */}
          <div className="mb-7 flex flex-wrap gap-2">
            <SkeletonBlock className="h-8.25 w-22.5 border border-border" />
            <SkeletonBlock className="h-8.25 w-37.5 border border-border" />
          </div>

          {/* Title */}
          <div className="max-w-5xl space-y-2 md:space-y-3">
            <SkeletonBlock className="h-10 w-[95%] md:h-16 lg:h-18" />
            <SkeletonBlock className="h-10 w-[68%] md:h-16 lg:h-18" />
          </div>

          {/* Excerpt */}
          <div className="mt-6 max-w-3xl border-l border-border pl-4 md:pl-5">
            <div className="space-y-2 py-1">
              <SkeletonBlock className="h-4 w-full max-w-2xl" />
              <SkeletonBlock className="h-4 w-4/5 max-w-xl" />
            </div>
          </div>

          {/* Author and publication metadata */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
            {/* Author avatar */}
            <SkeletonBlock className="h-7 w-7 shrink-0" />

            {/* Author name */}
            <SkeletonBlock className="h-3 w-28" />

            <SkeletonBlock className="hidden h-1 w-1 rounded-full sm:block" />

            {/* Reading time */}
            <SkeletonBlock className="h-3 w-16" />

            <SkeletonBlock className="hidden h-1 w-1 rounded-full sm:block" />

            {/* Date */}
            <SkeletonBlock className="h-3 w-24" />
          </div>

          {/* Featured image */}
          <div className="mt-12 md:mt-16 lg:mt-15">
            <SkeletonBlock className="aspect-[1.8/1] w-full md:aspect-[2.1/1]" />
          </div>

          {/* Article body */}
          <div className="mx-auto mt-12 max-w-4xl space-y-8 md:mt-16">
            {/* Paragraph */}
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-[92%]" />
              <SkeletonBlock className="h-4 w-4/5" />
            </div>

            {/* Subheading and paragraph */}
            <div className="space-y-4">
              <SkeletonBlock className="h-7 w-3/5 md:h-8" />

              <div className="space-y-3">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-[96%]" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            </div>

            {/* Another subheading and paragraph */}
            <div className="space-y-4">
              <SkeletonBlock className="h-7 w-1/2 md:h-8" />

              <div className="space-y-3">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-[90%]" />
                <SkeletonBlock className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPostSkeleton;
