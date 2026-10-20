import type { SearchPageData } from "@/types/searchPage";
import { payloadFetch } from "@/lib/payload/fetch";

export const getSearchPage = async (): Promise<SearchPageData> => {
  return payloadFetch<SearchPageData>("/api/globals/search-page");
};