import type { NotFoundPageData } from "@/types/notFoundPage";
import { payloadFetch } from "../fetch";

export async function getNotFoundPage(): Promise<NotFoundPageData> {
  return payloadFetch<NotFoundPageData>("/api/globals/not-found-page");
}