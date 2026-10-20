import type { Metadata } from "next";
import { cache } from "react";

import AllPosts from "@/components/pages/blog/AllPosts";
import BlogHero from "@/components/pages/blog/BlogHero";
import FeaturedBlogs from "@/components/pages/blog/FeaturedBlogs";
import NewsletterSection from "@/components/pages/home/NewsletterSection";

import { sortCategoriesByBlogCount } from "@/lib/blog/sortCategories";
import { getBlogs } from "@/lib/payload/blogs";
import { getCategories } from "@/lib/payload/categories";
import { getFeaturedBlogs } from "@/lib/payload/featuredBlogs";
import { getBlogPage } from "@/lib/payload/pages/getBlogPage";
import { getNewsletter } from "@/lib/payload/pages/getNewsletter";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { allPages } from "@/constant/pages";

const getCachedBlogPage = cache(getBlogPage);

export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await getCachedBlogPage();
  const seo = blogPage.seo;

  const title = seo?.metaTitle?.trim() || "AI News & Startup Stories";
  const description =
    seo?.metaDescription?.trim() || defaultSEO.DEFAULT_DESCRIPTION;

  const canonicalUrl = getCanonicalUrl(allPages.blog.url, seo?.canonicalUrl);

  const ogTitle = seo?.ogTitle?.trim() || title;
  const ogDescription = seo?.ogDescription?.trim() || description;

  const ogImage = seo?.ogImage?.url
    ? getPayloadImageUrl(seo.ogImage.url)
    : undefined;

  const twitterTitle = seo?.twitterTitle?.trim() || ogTitle;
  const twitterDescription = seo?.twitterDescription?.trim() || ogDescription;

  const twitterImage = seo?.twitterImage?.url
    ? getPayloadImageUrl(seo.twitterImage.url)
    : ogImage;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: defaultSEO.SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },

    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  };
}

const Blog = async () => {
  const [blogpage, featuredBlogs, blogCategories, blogs, newsletter] =
    await Promise.all([
      getCachedBlogPage(),
      getFeaturedBlogs(),
      getCategories(),
      getBlogs(),
      getNewsletter(),
    ]);

  const sortedCategories = sortCategoriesByBlogCount(
    blogCategories.docs,
    blogs.docs,
  );

  return (
    <main>
      <BlogHero data={blogpage.hero} />

      <FeaturedBlogs featuedBlogs={featuredBlogs.docs.slice(0, 5)} />

      <AllPosts
        categories={sortedCategories}
        blogs={blogs.docs}
        hasNextPage={blogs.hasNextPage}
        nextPage={blogs.nextPage}
      />

      <NewsletterSection data={newsletter} />
    </main>
  );
};

export default Blog;
