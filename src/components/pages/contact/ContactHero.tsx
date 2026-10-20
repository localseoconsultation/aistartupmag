import CrossLines from "@/components/shared/CrossLines";
import Typography from "@/components/ui/Typography";
import type { ContactPageData } from "@/types/contactPage";

type Props = {
  data: ContactPageData["hero"];
}

const ContactHero = ({data}: Props) => {
  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-12 md:px-8 md:pt-30 md:pb-24">
      <CrossLines className="pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="max-w-5xl">
        <Typography variant="display">{data.title}</Typography>

        <Typography
          variant="bodyLarge"
          className="mt-5 max-w-2xl border-l border-border pl-4 md:mt-6 md:pl-5"
        >
          {data.description}
        </Typography>
      </div>
    </section>
  );
};

export default ContactHero;
