
import CrossLines from "@/components/shared/CrossLines";
import Typography from "@/components/ui/Typography";
import type { SearchPageData } from "@/types/searchPage";

type Props = {
  data: SearchPageData["hero"];
}

const SearchHero = ({data}:Props) => {
  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-16 md:px-8 md:pt-30 md:pb-24">
      {/* Background */}
      <CrossLines className="pointer-events-none absolute inset-0 -z-10 opacity-30" />

      {/* Hero Content */}
      <div className="max-w-5xl">
        <Typography variant="display" className="max-w-5xl">
          {data.title}
        </Typography>

        <Typography
          variant="bodyLarge"
          className="mt-5 max-w-2xl border-l border-border pl-4 text-foreground/70 md:mt-6 md:pl-5"
        >
          {data.description}
        </Typography>
      </div>
    </section>
  );
};

export default SearchHero;