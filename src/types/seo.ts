
export type TwitterCardType = "summary" | "summary_large_image";

export type SEOData = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: {
    url: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  twitterCard?: TwitterCardType | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: {
    url: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};