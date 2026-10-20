import type { Metadata } from "next";
import { cache } from "react";

import AboutSection from "@/components/pages/home/AboutSection";
import EditorialSections from "@/components/pages/home/EditorialSections";
import FeaturedImage from "@/components/pages/home/FeaturedImage";
import HomepageHero from "@/components/pages/home/Hero";
import HomepageStats from "@/components/pages/home/HomepageStats";
import LatestPosts from "@/components/pages/home/LatestPosts";
import NewsletterSection from "@/components/pages/home/NewsletterSection";

import { getFeaturedBlogs } from "@/lib/payload/featuredBlogs";
import { getLatestBlogs } from "@/lib/payload/latestBlogs";
import { getHomepage } from "@/lib/payload/pages/getHomepage";
import { getNewsletter } from "@/lib/payload/pages/getNewsletter";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";

const getCachedHomepage = cache(getHomepage);

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedHomepage();
  const seo = homepage.seo;

  const title = seo?.metaTitle?.trim() || defaultSEO.SITE_URL;
  const description =
    seo?.metaDescription?.trim() || defaultSEO.DEFAULT_DESCRIPTION;

  const canonicalUrl = getCanonicalUrl("", seo?.canonicalUrl);

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

const Home = async () => {
  const [homepage, featuredBlogs, latestBlogs, newsletter] = await Promise.all([
    getCachedHomepage(),
    getFeaturedBlogs(),
    getLatestBlogs(),
    getNewsletter(),
  ]);

  return (
    <main>
      <HomepageHero
        data={homepage.hero}
        featuredBlogs={featuredBlogs.docs.slice(0, 5)}
      />

      <FeaturedImage data={homepage.featuredImage} />

      <AboutSection data={homepage.about} />

      <EditorialSections data={homepage.editorialSections} />

      <HomepageStats data={homepage.homepageStats} />

      <LatestPosts latestBlogs={latestBlogs.docs.slice(0, 6)} />

      <NewsletterSection data={newsletter} />
    </main>
  );
};

export default Home;
