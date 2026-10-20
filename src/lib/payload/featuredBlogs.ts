import { payloadFetch } from "./fetch";
import type { BlogsResponse } from "@/types/blog";

export async function getFeaturedBlogs(): Promise<BlogsResponse> {
  return payloadFetch<BlogsResponse>(
    "/api/blogs?limit=5&sort=-publishedAt&where[_status][equals]=published&where[tags][contains]=featured",
  );
}
