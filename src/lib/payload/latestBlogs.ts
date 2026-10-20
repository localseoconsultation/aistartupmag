import { payloadFetch } from "./fetch";
import type { BlogsResponse } from "@/types/blog";

export async function getLatestBlogs(): Promise<BlogsResponse> {
  return payloadFetch<BlogsResponse>(
    "/api/blogs?limit=6&sort=-publishedAt&where[_status][equals]=published",
  );
}