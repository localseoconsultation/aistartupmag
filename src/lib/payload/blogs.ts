import { payloadFetch } from "./fetch";
import type { BlogsResponse } from "@/types/blog";

export async function getBlogs(
  page = 1,
  categoryId?: number,
  query?: string,
): Promise<BlogsResponse> {
  const params = new URLSearchParams({
    limit: "15",
    page: String(page),
    sort: "-publishedAt",
    "where[_status][equals]": "published",
  });

  if (categoryId !== undefined) {
    params.set("where[categories][in]", String(categoryId));
  }

  const searchQuery = query?.trim();

  if (searchQuery) {
    params.set("where[or][0][title][contains]", searchQuery);
    params.set("where[or][1][excerpt][contains]", searchQuery);
    params.set("where[or][2][categories.name][contains]", searchQuery);
  }

  return payloadFetch<BlogsResponse>(`/api/blogs?${params.toString()}`);
}
