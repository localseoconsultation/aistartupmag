import type { AboutPageData } from "@/types/aboutPage";
import { payloadFetch } from "@/lib/payload/fetch";

export const getAboutPage = async (): Promise<AboutPageData> => {
  return payloadFetch<AboutPageData>("/api/globals/about-page?depth=1");
};
