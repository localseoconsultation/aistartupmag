const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export function getPayloadImageUrl(path: string): string {
  if (!path) {
    throw new Error("Payload image path is missing");
  }

  // Preserve absolute URLs.
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!PAYLOAD_URL) {
    throw new Error("NEXT_PUBLIC_PAYLOAD_URL is not defined");
  }

  const baseUrl = PAYLOAD_URL.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");

  return `${baseUrl}/${normalizedPath}`;
}