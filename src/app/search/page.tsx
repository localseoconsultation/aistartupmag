import type { Metadata } from "next";
import { cache, Suspense } from "react";

import AllPosts from "@/components/pages/blog/AllPosts";
import SearchForm from "@/components/pages/search/SearchForm";
import SearchHero from "@/components/pages/search/SearchHero";
import SearchResults from "@/components/pages/search/SearchResults";
import SearchResultsSkeleton from "@/components/skeleton/SearchResultsSkeleton";

import { sortCategoriesByBlogCount } from "@/lib/blog/sortCategories";
import { getBlogs } from "@/lib/payload/blogs";
import { getCategories, getCategoryBySlug } from "@/lib/payload/categories";
import { getSearchPage } from "@/lib/payload/pages/getSearchPage";

import { getPayloadImageUrl } from "@/lib/payload/image";
import { defaultSEO, getCanonicalUrl } from "@/constant/seo";
import { allPages } from "@/constant/pages";

const getCachedSearchPage = cache(getSearchPage);

export async function generateMetadata(): Promise<Metadata> {
  const search = await getCachedSearchPage();
  const seo = search.seo;

  const title =
    seo?.metaTitle?.trim() ||
    "Search AI News & Startup Stories | AI Startup Magazine";

  const description =
    seo?.metaDescription?.trim() ||
    "Search AI Startup Magazine for articles on artificial intelligence, startups, funding, founders, emerging technologies, and industry trends.";

  const canonicalUrl = getCanonicalUrl(allPages.search.url, seo?.canonicalUrl);

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
      index: seo?.noIndex === true ? false : true,
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

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";
  const category = params.category ?? "";
  const hasSearch = Boolean(query || category);

  const [search, categories] = await Promise.all([
    getCachedSearchPage(),
    getCategories(),
  ]);

  // Search requests don't need the initial 15-blog listing.
  if (hasSearch) {
    return (
      <main>
        <SearchHero data={search.hero} />

        <SearchForm
          categories={categories.docs}
          query={query}
          selectedCategory={category}
        />

        <Suspense
          key={`${query}-${category}-${params.page ?? "1"}`}
          fallback={<SearchResultsSkeleton />}
        >
          <SearchResultsContent
            query={query}
            category={category}
            page={params.page}
          />
        </Suspense>
      </main>
    );
  }

  // Fetch blogs only when displaying the default listing.
  const blogs = await getBlogs();

  const sortedCategories = sortCategoriesByBlogCount(
    categories.docs,
    blogs.docs,
  );

  return (
    <main>
      <SearchHero data={search.hero} />

      <SearchForm
        categories={sortedCategories}
        query={query}
        selectedCategory={category}
      />

      <AllPosts
        categories={sortedCategories}
        blogs={blogs.docs}
        hasNextPage={blogs.hasNextPage}
        nextPage={blogs.nextPage}
      />
    </main>
  );
};

type SearchResultsContentProps = {
  query: string;
  category: string;
  page?: string;
};

const SearchResultsContent = async ({
  query,
  category,
  page: pageParam,
}: SearchResultsContentProps) => {
  const requestedPage = Number(pageParam ?? "1");

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const selectedCategory = category ? await getCategoryBySlug(category) : null;

  if (category && !selectedCategory) {
    return (
      <section className="px-5 pb-16 md:px-8">
        <p className="text-foreground/70">
          The selected category could not be found.
        </p>
      </section>
    );
  }

  const searchResults = await getBlogs(page, selectedCategory?.id, query);

  return (
    <SearchResults
      results={searchResults.docs}
      query={query}
      selectedCategory={category}
      totalDocs={searchResults.totalDocs}
    />
  );
};

export default SearchPage;
