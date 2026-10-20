import type { HomepageData } from "@/types/homepage";
import { payloadFetch } from "../fetch";

export async function getHomepage(): Promise<HomepageData> {
  return payloadFetch<HomepageData>("/api/globals/homepage?depth=1");
}