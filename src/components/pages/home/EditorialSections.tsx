import EditorialCard from "@/components/ui/EditorialCard";
import type { HomepageData } from "@/types/homepage";

type Props = {
  data: HomepageData["editorialSections"];
};

const EditorialSections = ({ data }: Props) => {
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  return (
    <section className="px-5 pb-20 md:px-8 md:pb-26 lg:pb-36">
      <div className="max-w-400 mx-auto grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
        {data.sections.map((section) => {
          const imageUrl = section.image.url.startsWith("http")
            ? section.image.url
            : `${payloadUrl}${section.image.url}`;

          return (
            <EditorialCard
              key={section.id ?? section.url}
              title={section.title}
              description={section.description}
              image={imageUrl}
              url={section.url}
              exploreLabel={data.exploreLabel}
            />
          );
        })}
      </div>
    </section>
  );
};

export default EditorialSections;
