import type { BlogCategoriesResponse, BlogCategory } from "@/types/categories";

import { payloadFetch } from "./fetch";

export async function getCategories(): Promise<BlogCategoriesResponse> {
  return payloadFetch<BlogCategoriesResponse>("/api/categories?limit=100");
}

export async function getCategoryBySlug(
  slug: string,
): Promise<BlogCategory | null> {
  const params = new URLSearchParams({
    "where[slug][equals]": slug,
    limit: "1",
  });

  const response = await payloadFetch<BlogCategoriesResponse>(
    `/api/categories?${params.toString()}`,
  );

  return response.docs[0] ?? null;
}
