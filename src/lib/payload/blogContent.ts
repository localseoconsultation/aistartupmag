import { BlogPost } from "@/types/blogContent";
import { payloadFetch } from "./fetch";
import { BlogsResponse } from "@/types/blog";

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const response = await payloadFetch<{ docs: BlogPost[] }>(
    `/api/blogs?where[slug][equals]=${encodeURIComponent(
      slug,
    )}&where[_status][equals]=published&limit=1`,
  );

  return response.docs[0] ?? null;
}

export async function getRelatedBlogs(
  categoryIds: number[],
  currentBlogId: number,
) {
  if (categoryIds.length === 0) {
    return [];
  }

  const categoryQuery = categoryIds.join(",");

  const response = await payloadFetch<BlogsResponse>(
    `/api/blogs?limit=6&sort=-publishedAt&where[_status][equals]=published&where[categories][in]=${categoryQuery}&where[id][not_equals]=${currentBlogId}`,
  );

  return response.docs;
}
