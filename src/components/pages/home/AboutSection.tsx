
import Typography from "@/components/ui/Typography";
import type { HomepageData } from "@/types/homepage";

type Props = {
  data: HomepageData["about"];
};

const AboutSection = ({ data }: Props) => {
  return (
    <section className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
      <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:col-span-4 lg:flex xl:col-span-5">
          <div className="flex flex-col">
            <Typography variant="displayNumber">
              {data.number}
            </Typography>

            <Typography
              variant="bodyLarge"
              className="text-primary font-medium"
            >
              {data.label}
            </Typography>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-7">
          <Typography variant="h2">{data.title}</Typography>

          <div className="mt-8 space-y-6">
            {data.paragraphs.map((paragraph, index) => (
              <Typography
                key={paragraph.id ?? `${index}-${paragraph.text}`}
                variant="body"
              >
                {paragraph.text}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;