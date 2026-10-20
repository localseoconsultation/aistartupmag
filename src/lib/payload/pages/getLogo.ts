import type { LogoData } from "@/types/logo";
import { payloadFetch } from "@/lib/payload/fetch";

export async function getLogo(): Promise<LogoData> {
  return payloadFetch<LogoData>("/api/globals/site-logo?depth=1");
}