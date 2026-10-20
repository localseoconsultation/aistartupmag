import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryContent from "@/components/pages/category/CategoryContent";
import NewsletterSection from "@/components/pages/home/NewsletterSection";

import { allPages } from "@/constant/pages";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { getBlogs } from "@/lib/payload/blogs";
import { getCategoryBySlug } from "@/lib/payload/categories";
import { getNewsletter } from "@/lib/payload/pages/getNewsletter";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category.name} | ${defaultSEO.SITE_NAME}`;
  const description = category.description;

  const canonicalUrl = getCanonicalUrl(`/category/${categorySlug}`);

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
      type: "website",
      url: canonicalUrl,
      siteName: defaultSEO.SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };

  console.log();
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const [blogs, newsletter] = await Promise.all([
    getBlogs(1, category.id),
    getNewsletter(),
  ]);

  return (
    <main>
      <CategoryContent
        category={category}
        blogs={blogs.docs}
        hasNextPage={blogs.hasNextPage}
        nextPage={blogs.nextPage}
      />

      <NewsletterSection data={newsletter} />
    </main>
  );
};

export default CategoryPage;
