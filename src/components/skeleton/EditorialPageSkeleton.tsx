const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div aria-hidden="true" className={`bg-muted/40 ${className}`} />
);

const EditorialPageSkeleton = () => {
  return (
    <main aria-label="Loading page" aria-busy="true">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-16 md:px-8 md:pt-30 md:pb-24">
        {/* Heading */}
        <div className="max-w-5xl space-y-3">
          <SkeletonBlock className="h-10 w-[92%] md:h-16 lg:h-20" />
          <SkeletonBlock className="h-10 w-[65%] md:h-16 lg:h-20" />
        </div>

        {/* Description */}
        <div className="mt-6 max-w-2xl border-l border-border pl-4 md:pl-5">
          <div className="space-y-2 py-1">
            <SkeletonBlock className="h-4 w-full max-w-xl" />
            <SkeletonBlock className="h-4 w-4/5 max-w-lg" />
          </div>
        </div>
      </section>

      <section className="bg-muted/40 w-full min-h-[80vh] animate-pulse" />
    </main>
  );
};

export default EditorialPageSkeleton;
