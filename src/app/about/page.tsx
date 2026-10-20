import type { Metadata } from "next";
import { cache } from "react";

import AboutHero from "@/components/pages/about/AboutHero";
import AboutSections from "@/components/pages/about/AboutSections";
import ContributeSection from "@/components/pages/about/ContributeSection";
import FounderSection from "@/components/pages/about/FounderSection";
import TechnologySection from "@/components/pages/about/TechnologySection";

import { getAboutPage } from "@/lib/payload/pages/getAboutPage";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { allPages } from "@/constant/pages";

const getCachedAboutPage = cache(getAboutPage);

export async function generateMetadata(): Promise<Metadata> {
  const about = await getCachedAboutPage();
  const seo = about.seo;

  const title =
    seo?.metaTitle?.trim() ||
    "About AI Startup Magazine | Our Mission & Vision";

  const description =
    seo?.metaDescription?.trim() || defaultSEO.DEFAULT_DESCRIPTION;

  const canonicalUrl = getCanonicalUrl(allPages.about.url, seo?.canonicalUrl);

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

const AboutUsPage = async () => {
  const about = await getCachedAboutPage();

  return (
    <main>
      <AboutHero data={about.hero} />
      <AboutSections data={about.sections} />
      <FounderSection data={about.founder} />
      <TechnologySection data={about.technology} />
      <ContributeSection data={about.contribute} />
    </main>
  );
};

export default AboutUsPage;
