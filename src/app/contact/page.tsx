import type { Metadata } from "next";
import { cache } from "react";

import ContactHero from "@/components/pages/contact/ContactHero";
import ContactSection from "@/components/pages/contact/ContactSection";

import { getContactPage } from "@/lib/payload/pages/getContactPage";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { allPages } from "@/constant/pages";

const getCachedContactPage = cache(getContactPage);

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getCachedContactPage();
  const seo = contact.seo;

  const title =
    seo?.metaTitle?.trim() || "Contact AI Startup Magazine | Get in Touch";

  const description =
    seo?.metaDescription?.trim() ||
    "Contact AI Startup Magazine for editorial inquiries, startup features, partnerships, collaborations, and questions about AI news and emerging technologies.";

  const canonicalUrl = getCanonicalUrl(allPages.contact.url, seo?.canonicalUrl);

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

const ContactPage = async () => {
  const contact = await getCachedContactPage();

  return (
    <main>
      <ContactHero data={contact.hero} />

      <ContactSection
        data={{
          info: contact.contactInformation,
          form: contact.contactForm,
        }}
      />
    </main>
  );
};

export default ContactPage;
