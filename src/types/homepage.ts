import type { SEOData } from "@/types/seo";

export type HomepageImage = {
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type HomepageData = {
  hero: {
    title: string;
    description: string;
    cta: {
      title: string;
      url: string;
    };
  };

  featuredImage: {
    image: HomepageImage;
    alt: string;
  };

  about: {
    number: string;
    label: string;
    title: string;
    paragraphs: {
      text: string;
      id?: string | null;
    }[];
  };

  editorialSections: {
    exploreLabel: string;
    sections: {
      title: string;
      description: string;
      image: HomepageImage;
      url: string;
      id?: string | null;
    }[];
  };

  homepageStats: {
    image: HomepageImage;
    imageAlt: string;
    stats: {
      value: string;
      description: string;
      backgroundColor: string;
      id?: string | null;
    }[];
  };

  seo?: SEOData | null;
};
