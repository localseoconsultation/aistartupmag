
import Image from "next/image";

import Typography from "@/components/ui/Typography";
import type { HomepageData } from "@/types/homepage";

type Props = {
  data: HomepageData["homepageStats"];
};

const HomepageStats = ({ data }: Props) => {
    const image = data.image;

  const imageUrl = image.url.startsWith("http")
    ? image.url
    : `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${image.url}`;
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="relative lg:sticky lg:top-0 lg:h-screen">
          <div className="relative aspect-4/3 w-full overflow-hidden lg:h-full lg:aspect-auto">
            <Image
              src={imageUrl}
              alt={data.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 66.67vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col">
          {data.stats.map((stat, index) => (
            <article
              key={stat.id ?? `${stat.value}-${index}`}
              style={{ backgroundColor: stat.backgroundColor }}
              className="flex min-h-95 flex-col justify-between px-6 py-10 md:min-h-120 md:px-10 md:py-12 lg:min-h-[70vh] lg:px-12 lg:py-14"
            >
              <Typography variant="displayNumber">
                {stat.value}
              </Typography>

              <Typography variant="h3" className="max-w-lg font-medium">
                {stat.description}
              </Typography>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageStats;