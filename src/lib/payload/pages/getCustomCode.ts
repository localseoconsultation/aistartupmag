import type { CustomCodeData } from "@/types/customCode";
import { payloadFetch } from "@/lib/payload/fetch";

export const getCustomCode = async (): Promise<CustomCodeData> => {
  return payloadFetch<CustomCodeData>("/api/globals/custom-code?depth=0");
};
