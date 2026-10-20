import { SEOData } from "./seo";

export type ContactThankYouPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
  seo?: SEOData | null;
};

export type NewsletterThankYouPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
  seo?: SEOData | null;
};
