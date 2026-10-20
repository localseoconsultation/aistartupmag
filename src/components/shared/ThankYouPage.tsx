import LinkButton from "@/components/ui/LinkButton";
import Typography from "@/components/ui/Typography";
import CrossLines from "./CrossLines";

export type ThankYouPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
};

export type ThankYouPageData = {
  contact: ThankYouPageContent;
  newsletter: ThankYouPageContent;
};

type Props = {
  data: ThankYouPageContent;
};

const ThankYouPage = ({ data }: Props) => {
  const { eyebrow, title, description, cta } = data;

  return (
    <div className="relative overflow-hidden">
      <CrossLines className="pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block">
            <Typography variant="eyebrow">{eyebrow}</Typography>
          </div>

          <div className="lg:col-span-8">
            <Typography variant="eyebrow" className="lg:hidden">
              {eyebrow}
            </Typography>

            <Typography variant="display" className="mt-4 max-w-5xl lg:mt-0">
              {title}
            </Typography>

            <Typography
              variant="bodyLarge"
              className="mt-7 max-w-2xl border-l border-border pl-4 text-foreground/70 md:pl-5"
            >
              {description}
            </Typography>

            <div className="mt-9">
              <LinkButton
                title={cta.label}
                url={cta.href}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;