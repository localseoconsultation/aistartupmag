import Typography from "@/components/ui/Typography";
import type { AboutPageData } from "@/types/aboutPage";

type Props = {
  data: AboutPageData["technology"];
};

const TechnologySection = ({ data }: Props) => {
  return (
    <section className="w-full px-5 md:px-8 mx-auto grid max-w-400 ">
      <div key={data.title} id={data.title}>
        <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-12 md:gap-8 md:py-20 lg:gap-12 lg:py-24">
          {/* Editorial Marker */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex flex-col">
              <Typography variant="displayNumber">03</Typography>

              <Typography
                variant="bodyLarge"
                className="text-primary font-medium"
              >
                {data.label}
              </Typography>
            </div>
          </div>

          {/* technologySection Content */}
          <div className="md:col-span-8 lg:col-span-7">
            <Typography variant="h2">{data.title}</Typography>

            <div className="mt-8 space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
