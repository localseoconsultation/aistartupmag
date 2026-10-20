import { SEOData } from "./seo";

export type NotFoundPageData = {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  seo?: SEOData | null;
};
