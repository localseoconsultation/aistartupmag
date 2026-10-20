import type { MetadataRoute } from "next";

import { allPages } from "@/constant/pages";
import { defaultSEO } from "@/constant/seo";
import { getBlogs } from "@/lib/payload/blogs";
import { getCategories } from "@/lib/payload/categories";

type SitemapEntry = MetadataRoute.Sitemap[number];

type BlogSitemapItem = {
  slug?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

type CategorySitemapItem = {
  slug?: string | null;
  updatedAt?: string | null;
};

const SITE_URL = defaultSEO.SITE_URL.replace(/\/+$/, "");

function toAbsoluteUrl(path: string): string {
  return new URL(
    path.startsWith("/") ? path : `/${path}`,
    `${SITE_URL}/`,
  ).toString();
}

function toValidDate(value?: string | null): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages that should be discoverable by search engines.
  const staticPaths = [
    allPages.home.url,
    allPages.about.url,
    allPages.contact.url,
    allPages.blog.url,
  ];

  const staticEntries: SitemapEntry[] = staticPaths.map((path) => ({
    url: toAbsoluteUrl(path),
  }));

  // Fetch categories and the first page of published blogs concurrently.
  const [categoriesResponse, firstPage] = await Promise.all([
    getCategories(),
    getBlogs(1),
  ]);

  // Collect every page of published blogs.
  const blogs: BlogSitemapItem[] = [...firstPage.docs];

  let hasNextPage = firstPage.hasNextPage;
  let nextPage = firstPage.nextPage;

  while (hasNextPage && nextPage) {
    const page = await getBlogs(nextPage);

    blogs.push(...page.docs);

    hasNextPage = page.hasNextPage;
    nextPage = page.nextPage;
  }

  // Individual blog post URLs.
  const blogEntries: SitemapEntry[] = blogs
    .filter((blog) => Boolean(blog.slug))
    .map((blog) => ({
      url: toAbsoluteUrl(`${allPages.blog.url}/${blog.slug}`),
      lastModified:
        toValidDate(blog.updatedAt) ?? toValidDate(blog.publishedAt),
    }));

  // Category URLs.
  const categoryEntries: SitemapEntry[] = categoriesResponse.docs
    .filter((category: CategorySitemapItem) => Boolean(category.slug))
    .map((category: CategorySitemapItem) => ({
      url: toAbsoluteUrl(`/category/${category.slug}`),
      lastModified: toValidDate(category.updatedAt),
    }));

  return [...staticEntries, ...categoryEntries, ...blogEntries];
}
