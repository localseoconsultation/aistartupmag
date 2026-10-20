import type { Metadata } from "next";
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
      title: content.title,
      description: content.excerpt,
      ...(featuredImage ? { images: [{ url: featuredImage }] } : {}),
      ...(content.publishedAt ? { publishedTime: content.publishedAt } : {}),
      ...(content.updatedAt ? { modifiedTime: content.updatedAt } : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.excerpt,
      ...(featuredImage ? { images: [featuredImage] } : {}),
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const content = await getBlogBySlug(slug);

  if (!content) {
    notFound();
  }

  const categoryIds = content.categories.map((category) => category.id);

  const [relatedBlogs, newsletter] = await Promise.all([
    getRelatedBlogs(categoryIds, content.id),
    getNewsletter(),
  ]);

  return (
    <main>
      <BlogPost blog={content} />
      <RelatedBlogs blogs={relatedBlogs} />
      <NewsletterSection data={newsletter} />
    </main>
  );
};

export default BlogPostPage;
