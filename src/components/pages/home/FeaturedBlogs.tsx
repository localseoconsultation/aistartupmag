"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { BlogCardProps } from "@/types/blog";
import FeaturedBlogCard from "@/components/ui/FeaturedBlogCard";

type Props = {
  featuredBlogs: BlogCardProps[];
};

const AUTOPLAY_DELAY = 5000;

const FeaturedBlogs = ({ featuredBlogs }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (featuredBlogs.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % featuredBlogs.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [activeIndex, featuredBlogs.length]);

  if (featuredBlogs.length === 0) return null;

  const story = featuredBlogs[activeIndex];

  const showPrevious = () => {
    setDirection(-1);
    setActiveIndex(
      (current) => (current - 1 + featuredBlogs.length) % featuredBlogs.length,
    );
  };

  const showNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % featuredBlogs.length);
  };

  return (
    <section className="w-full">
      <div className="group relative w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                opacity: 0,
                x: direction * 30,
              }),
              center: {
                opacity: 1,
                x: 0,
              },
              exit: (direction: number) => ({
                opacity: 0,
                x: direction * -30,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <FeaturedBlogCard
              {...story}
              index={activeIndex}
              total={featuredBlogs.length}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute top-[calc(50%-1.5rem)] right-5 left-5 flex -translate-y-1/2 items-center justify-between md:right-6 md:left-6">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous featured story"
            className="pointer-events-auto flex h-11 w-11 translate-x-2 items-center justify-center bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-x-0 group-hover:opacity-100"
          >
            <ArrowLeft size={20} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next featured story"
            className="pointer-events-auto flex h-11 w-11 -translate-x-2 items-center justify-center bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-x-0 group-hover:opacity-100"
          >
            <ArrowRight size={20} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
