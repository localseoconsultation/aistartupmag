import type { ContactPageData } from "@/types/contactPage";
import { payloadFetch } from "@/lib/payload/fetch";

export const getContactPage = async (): Promise<ContactPageData> => {
  return payloadFetch<ContactPageData>("/api/globals/contact-page");
};