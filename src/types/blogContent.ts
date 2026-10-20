import type { SerializedEditorState } from "lexical";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  generateSlug: boolean;
  _status: "published" | "draft";

  author: {
    id: number;
    name: string;
    generateSlug: boolean;
    slug: string;
    photo: number | null;
  };

  categories: {
    id: number;
    name: string;
    generateSlug: boolean;
    slug: string;
    description: string;
    updatedAt: string;
    createdAt: string;
  }[];

  featuredImage: {
    id: number;
    alt: string;
    url: string;
    width?: number;
    height?: number;
  } | null;

  content: SerializedEditorState;

  tags: {
    id: number;
    name: string;
    slug: string;
  }[];

  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: number | null;
  };
};