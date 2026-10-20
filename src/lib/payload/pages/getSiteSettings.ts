import type { SiteSettingsData } from "@/types/siteSettings";
import { payloadFetch } from "@/lib/payload/fetch";

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return payloadFetch<SiteSettingsData>(
    "/api/globals/site-settings?depth=1",
  );
}