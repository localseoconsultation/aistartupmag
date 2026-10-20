
import LinkButton from "@/components/ui/LinkButton";
import Typography from "@/components/ui/Typography";
import CrossLines from "@/components/shared/CrossLines";
import FeaturedBlogs from "./FeaturedBlogs";
import type { BlogCardProps } from "@/types/blog";

type Props = {
  data: {
    title: string;
    description: string;
    cta: {
      title: string;
      url: string;
    };
  };
  featuredBlogs: BlogCardProps[];
};

const HomepageHero = ({ data, featuredBlogs }: Props) => {
  return (
    <section className="relative overflow-x-hidden px-5 pt-12 pb-12 md:px-8 md:pt-30 md:pb-24">
      <CrossLines className="pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="flex w-full flex-col gap-12 xl:flex-row xl:justify-between xl:gap-16">
        <div className="max-w-5xl">
          <Typography variant="display" className="max-w-5xl">
            {data.title}
          </Typography>

          <Typography
            variant="bodyLarge"
            className="mt-5 max-w-2xl border-l border-border pl-4 md:mt-6 md:pl-5"
          >
            {data.description}
          </Typography>

          <div className="mt-7">
            <LinkButton
              title={data.cta.title}
              url={data.cta.url}
              variant="primary"
            />
          </div>
        </div>

        <div className="w-full shrink-0 xl:w-105">
          <FeaturedBlogs featuredBlogs={featuredBlogs} />
        </div>
      </div>
    </section>
  );
};

export default HomepageHero;