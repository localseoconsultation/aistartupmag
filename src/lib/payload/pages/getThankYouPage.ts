import type { ContactThankYouPageData } from "@/types/thankyouPage";
import type { NewsletterThankYouPageData } from "@/types/thankyouPage";
import { payloadFetch } from "../fetch";

export async function getContactThankYouPage(): Promise<ContactThankYouPageData> {
  return payloadFetch<ContactThankYouPageData>(
    "/api/globals/contact-thank-you-page",
  );
}

export async function getNewsletterThankYouPage(): Promise<NewsletterThankYouPageData> {
  return payloadFetch<NewsletterThankYouPageData>(
    "/api/globals/newsletter-thank-you-page",
  );
}
