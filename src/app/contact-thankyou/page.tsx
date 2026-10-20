import type { Metadata } from "next";
import { cache } from "react";

import ThankYouPage from "@/components/shared/ThankYouPage";

import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { getContactThankYouPage } from "@/lib/payload/pages/getThankYouPage";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { allPages } from "@/constant/pages";

const getCachedContactThankYouPage = cache(getContactThankYouPage);

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCachedContactThankYouPage();
  const seo = data.seo;

  const title =
    seo?.metaTitle?.trim() ||
    "Thank You for Contacting Us | AI Startup Magazine";

  const description =
    seo?.metaDescription?.trim() ||
    "Thanks for reaching out to AI Startup Magazine. Your message has been received, and our team will respond as soon as possible.";

  const canonicalUrl = getCanonicalUrl(
    `${allPages.contactThankYou.url}`,
    seo?.canonicalUrl,
  );

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

const ContactThankYouPage = async () => {
  const data = await getCachedContactThankYouPage();

  return (
    <main>
      <ThankYouPage data={data.hero} />
    </main>
  );
};

export default ContactThankYouPage;
