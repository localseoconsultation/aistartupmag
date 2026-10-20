import { allPages } from "../constant/pages";

export const navbarConfig = {
  search: {
    title: allPages.search.title,
    url: allPages.search.url,
  },

  contact: {
    title: allPages.contact.title,
    url: allPages.contact.url,
  },

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
} as const;
