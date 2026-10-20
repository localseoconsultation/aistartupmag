import { SEOData } from "./seo";

export type BlogCardProps = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  featuredImage: {
    id: number;
    alt: string;
    url: string;
  } | null;
};

export type BlogsResponse = {
  docs: BlogCardProps[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type BlogPageData = {
  hero: {
    title: string;
    description: string;
  };
  seo?: SEOData | null;
};
