import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import BlogPost from "@/components/pages/blog/individual/BlogPost";
import RelatedBlogs from "@/components/pages/blog/individual/RelatedBlogs";
import NewsletterSection from "@/components/pages/home/NewsletterSection";

import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { getPayloadImageUrl } from "@/lib/payload/image";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/payload/blogContent";
import { getNewsletter } from "@/lib/payload/pages/getNewsletter";
import { allPages } from "@/constant/pages";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getBlogBySlug(slug);

  if (!content) {
    return {
      title: "Blog Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = content.seo;

  const title = seo?.metaTitle?.trim() || content.title;
  const description = seo?.metaDescription?.trim() || content.excerpt;

  const canonicalUrl = getCanonicalUrl(`/${allPages.blog.url}/${slug}`);

  const featuredImage = content.featuredImage?.url
    ? getPayloadImageUrl(content.featuredImage.url)
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: defaultSEO.SITE_NAME,
      title,
      description,
      ...(featuredImage ? { images: [{ url: featuredImage }] } : {}),
      ...(content.publishedAt ? { publishedTime: content.publishedAt } : {}),
      ...(content.updatedAt ? { modifiedTime: content.updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(featuredImage ? { images: [featuredImage] } : {}),
    },
  };
}

async function BlogPostExtras({
  categoryIds,
  blogId,
}: {
  categoryIds: number[];
  blogId: number;
}) {
  const [relatedBlogs, newsletter] = await Promise.all([
    getRelatedBlogs(categoryIds, blogId),
    getNewsletter(),
  ]);

  return (
    <>
      <RelatedBlogs blogs={relatedBlogs} />
      <NewsletterSection data={newsletter} />
    </>
  );
}

function BlogPostExtrasFallback() {
  return <div className="min-h-40" aria-hidden="true" />;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const content = await getBlogBySlug(slug);

  if (!content) {
    notFound();
  }

  const categoryIds = content.categories.map((category) => category.id);

  return (
    <main>
      <BlogPost blog={content} />

      <Suspense fallback={<BlogPostExtrasFallback />}>
        <BlogPostExtras categoryIds={categoryIds} blogId={content.id} />
      </Suspense>
    </main>
  );
}
