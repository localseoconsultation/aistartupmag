import { SEOData } from "./seo";

export type SearchPageData = {
  hero: {
    title: string;
    description: string;
  };
  seo?: SEOData | null;
};