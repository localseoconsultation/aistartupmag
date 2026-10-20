import { payloadFetch } from "@/lib/payload/fetch";
import { BlogPageData } from "@/types/blog";

export const getBlogPage = async (): Promise<BlogPageData> => {
  return payloadFetch<BlogPageData>("/api/globals/blog-page");
};