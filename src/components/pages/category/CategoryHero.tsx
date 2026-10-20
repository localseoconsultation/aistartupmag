import CrossLines from "@/components/shared/CrossLines";
import LinkButton from "@/components/ui/LinkButton";
import Typography from "@/components/ui/Typography";
import { allPages } from "@/constant/pages";

type CategoryHeroProps = {
  title: string;
  description: string;
};

const CategoryHero = ({ title, description }: CategoryHeroProps) => {
  return (
    <section className="relative overflow-hidden px-5 pt-12 md:px-8 md:pt-30">
      {/* Background */}
      <CrossLines className="pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12 lg:mb-14">
        {/* Hero Content */}
        <div className="max-w-5xl">
          <Typography variant="display" className="max-w-5xl">
            Stories in {title}
          </Typography>

          <Typography
            variant="bodyLarge"
            className="mt-5 max-w-2xl border-l border-border pl-4 text-foreground/70 md:mt-6 md:pl-5"
          >
            {description}
          </Typography>
        </div>

        <LinkButton title="View All Stories" url={allPages.blog.url} variant="light" />
      </div>
    </section>
  );
};

export default CategoryHero;
