import { allPages } from "../constant/pages";

export const footerConfig = {
  navigation: {
    explore: {
      title: "Explore",
      links: [
        {
          title: allPages.home.title,
          url: allPages.home.url,
        },
        {
          title: allPages.blog.title,
          url: allPages.blog.url,
        },
        {
          title: allPages.about.title,
          url: allPages.about.url,
        },
      ],
    },

    company: {
      title: "Company",
      links: [
        {
          title: allPages.contact.title,
          url: allPages.contact.url,
        },
        {
          title: allPages.privacy.title,
          url: allPages.privacy.url,
        },
        {
          title: allPages.terms.title,
          url: allPages.terms.url,
        },
      ],
    },
  },
} as const;
