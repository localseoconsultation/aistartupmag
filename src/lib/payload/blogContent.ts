import { cache } from "react";

import { BlogPost } from "@/types/blogContent";
import { payloadFetch } from "./fetch";
import { BlogsResponse } from "@/types/blog";

export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const query = new URLSearchParams({
      "where[slug][equals]": slug,
      "where[_status][equals]": "published",
      limit: "1",
    });

    const response = await payloadFetch<{ docs: BlogPost[] }>(
      `/api/blogs?${query.toString()}`,
    );

    return response.docs[0] ?? null;
  },
);

export async function getRelatedBlogs(
  categoryIds: number[],
  currentBlogId: number,
) {
  if (categoryIds.length === 0) {
    return [];
  }

  const query = new URLSearchParams({
    limit: "6",
    sort: "-publishedAt",
    "where[_status][equals]": "published",
    "where[categories][in]": categoryIds.join(","),
    "where[id][not_equals]": String(currentBlogId),
  });

  const response = await payloadFetch<BlogsResponse>(
    `/api/blogs?${query.toString()}`,
  );

  return response.docs;
}
