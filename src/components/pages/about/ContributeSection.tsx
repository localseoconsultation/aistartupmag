import Typography from "@/components/ui/Typography";
import LinkButton from "@/components/ui/LinkButton";
import type { AboutPageData } from "@/types/aboutPage";

type Props = {
  data: AboutPageData["contribute"];
};

const ContributeSection = ({ data }: Props) => {
  return (
    <section className="bg-secondary-backgound/60 px-5 py-20 md:px-8 md:py-26 lg:py-36">
      <div className="mx-auto grid max-w-400 grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-5">
          <Typography variant="eyebrow">{data.label}</Typography>

          <Typography variant="h2" className="mt-5 max-w-2xl">
            {data.title}
          </Typography>
        </div>

        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-5">
            {data.paragraphs.map((paragraph) => (
              <Typography
                key={paragraph.id}
                variant="body"
                className="text-foreground/75"
              >
                {paragraph.text}
              </Typography>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6 space-y-6">
            <Typography variant="body">{data.cta.description}</Typography>

            <LinkButton
              variant="primary"
              title={data.cta.label}
              url={data.cta.href}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;
