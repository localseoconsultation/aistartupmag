import Image from "next/image";

import Typography from "@/components/ui/Typography";
import type { AboutPageData } from "@/types/aboutPage";

type Props = {
  data: AboutPageData["founder"];
};

const FounderSection = ({ data }: Props) => {
  const image = data.image;
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  const imageUrl = image.url.startsWith("http")
    ? image.url
    : new URL(
        image.url,
        payloadUrl?.endsWith("/") ? payloadUrl : `${payloadUrl}/`,
      ).toString();
  return (
    <section className="bg-secondary-backgound/60 px-5 py-20 md:px-8 md:py-26 lg:py-36">
      <div className="mx-auto grid max-w-400 grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Founder Image — 5 columns */}
        <div className="relative aspect-4/5 overflow-hidden lg:col-span-5">
          <Image
            src={imageUrl}
            alt={data.image.alt || "Founder Image"}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Founder Content — 7 columns */}
        <div className="lg:col-span-7">
          <Typography variant="eyebrow">{data.label}</Typography>

          <Typography variant="h2" className="mt-5 max-w-3xl">
            {data.title}
          </Typography>

          <div className="mt-8 max-w-2xl space-y-5">
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
    </section>
  );
};

export default FounderSection;
