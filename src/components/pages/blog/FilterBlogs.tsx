"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Typography from "@/components/ui/Typography";
import { BlogCategory } from "@/types/categories";

type FilterBlogsProps = {
  categories: BlogCategory[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const FilterBlogs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBlogsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full pt-20 md:pt-26 lg:pt-36 pb-4 border-b border-border">
      <div className="group relative">
        {/* Categories */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-none">
          <nav
            aria-label="Filter blogs by category"
            className="flex min-w-max items-center gap-10 pr-28 md:gap-12 lg:gap-14"
          >
            {/* All */}
            <button
              type="button"
              onClick={() => onCategoryChange(null)}
              className="group/category relative shrink-0"
              aria-pressed={activeCategory === null}
            >
              <Typography
                variant="small"
                className={[
                  "font-medium uppercase tracking-[0.06em]",
                  "transition-colors duration-300",
                  activeCategory === null
                    ? "text-primary"
                    : "text-foreground hover:text-primary",
                ].join(" ")}
              >
                All
              </Typography>

              <span
                aria-hidden="true"
                className={[
                  "absolute right-0 bottom-0 left-0 h-px",
                  "origin-left transition-transform duration-300",
                  activeCategory === null
                    ? "scale-x-100 bg-primary"
                    : "scale-x-0 bg-primary group-hover/category:scale-x-100",
                ].join(" ")}
              />
            </button>

            {/* Payload Categories */}
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.slug)}
                  className="group/category relative shrink-0"
                  aria-pressed={isActive}
                >
                  <Typography
                    variant="small"
                    className={[
                      "font-medium uppercase tracking-[0.06em]",
                      "transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    ].join(" ")}
                  >
                    {category.name}
                  </Typography>

                  <span
                    aria-hidden="true"
                    className={[
                      "absolute right-0 bottom-0 left-0 h-px",
                      "origin-left transition-transform duration-300",
                      isActive
                        ? "scale-x-100 bg-primary"
                        : "scale-x-0 bg-primary group-hover/category:scale-x-100",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Navigation Controls */}
        <div className="pointer-events-none absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1 bg-linear-to-l from-background via-background to-transparent pl-8">
          <button
            type="button"
            onClick={() => scrollCategories("left")}
            aria-label="Previous blog categories"
            className="pointer-events-auto flex h-11 w-11 translate-x-2 items-center justify-center bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-x-0 group-hover:opacity-100"
          >
            <ArrowLeft size={20} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={() => scrollCategories("right")}
            aria-label="Next blog categories"
            className="pointer-events-auto flex h-11 w-11 -translate-x-2 items-center justify-center bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-x-0 group-hover:opacity-100"
          >
            <ArrowRight size={20} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterBlogs;
