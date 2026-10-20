import type { NewsletterData } from "@/types/newsletter";
import { payloadFetch } from "../fetch";

export async function getNewsletter(): Promise<NewsletterData> {
  return payloadFetch<NewsletterData>("/api/globals/newsletter?depth=1");
}