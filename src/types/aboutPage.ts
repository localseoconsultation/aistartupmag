import { SEOData } from "./seo";

export type AboutParagraph = {
  id?: string | null;
  text: string;
};

export type AboutPageData = {
  hero: {
    title: string;
    description: string;
  };
  sections: {
    id: string;
    label: string;
    title: string;
    paragraphs: AboutParagraph[];
  }[];
  founder: {
    label: string;
    title: string;
    image: {
      url: string;
      alt?: string | null;
      width?: number | null;
      height?: number | null;
    };
    imageAlt: string;
    paragraphs: AboutParagraph[];
  };
  technology: {
    label: string;
    title: string;
    paragraphs: AboutParagraph[];
  };
  contribute: {
    label: string;
    title: string;
    paragraphs: AboutParagraph[];
    cta: {
      label: string;
      href: string;
      description: string;
    };
  };
  seo?: SEOData | null;
};
