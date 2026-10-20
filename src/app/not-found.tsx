import type { Metadata } from "next";
import { cache } from "react";

import LinkButton from "@/components/ui/LinkButton";
import Typography from "@/components/ui/Typography";

import { getNotFoundPage } from "@/lib/payload/pages/getNotFoundPage";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO } from "@/constant/seo";

const getCachedNotFoundPage = cache(getNotFoundPage);

export async function generateMetadata(): Promise<Metadata> {
  const notFoundPage = await getCachedNotFoundPage();
  const seo = notFoundPage.seo;

  const title =
    seo?.metaTitle?.trim() || "Page Not Found | AI Startup Magazine";

  const description =
    seo?.metaDescription?.trim() ||
    "The page you're looking for couldn't be found. Explore the latest AI news, startup stories, technology insights, and innovation at AI Startup Magazine.";

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

    openGraph: {
      type: "website",
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

const NotFound = async () => {
  const notFoundPage = await getCachedNotFoundPage();

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center overflow-hidden">
      <div className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12">
          {/* Eyebrow */}
          <div className="hidden lg:col-span-4 lg:block">
            <Typography variant="eyebrow">{notFoundPage.eyebrow}</Typography>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <Typography variant="eyebrow" className="lg:hidden">
              {notFoundPage.eyebrow}
            </Typography>

            <Typography variant="display" className="mt-4 max-w-4xl lg:mt-0">
              {notFoundPage.title}
            </Typography>

            <Typography
              variant="bodyLarge"
              className="mt-7 max-w-2xl border-l border-border pl-4 text-foreground/70 md:pl-5"
            >
              {notFoundPage.description}
            </Typography>

            <div className="mt-9">
              <LinkButton
                title={notFoundPage.cta.label}
                url={notFoundPage.cta.href}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
