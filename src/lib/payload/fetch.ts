const PAYLOAD_URL = process.env.PAYLOAD_URL;
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

if (!PAYLOAD_URL) {
  throw new Error("PAYLOAD_URL is not defined");
}

if (!PAYLOAD_API_KEY) {
  throw new Error("PAYLOAD_API_KEY is not defined");
}

let requestCount = 0;

type PayloadFetchOptions = RequestInit & {
  revalidate?: number;
};

export async function payloadFetch<T>(
  path: string,
  options: PayloadFetchOptions = {},
): Promise<T> {
  const { revalidate = 300, ...fetchOptions } = options;

  const requestNumber = ++requestCount;
  const url = `${PAYLOAD_URL}${path}`;
  const start = performance.now();

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Payload #${requestNumber}] → ${fetchOptions.method ?? "GET"} ${path}`,
    );
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      Authorization: `users API-Key ${PAYLOAD_API_KEY}`,
      ...fetchOptions.headers,
    },
    next: {
      revalidate,
    },
  });

  const duration = Math.round(performance.now() - start);

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Payload #${requestNumber}] ← ${response.status} ${path} (${duration}ms)`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `Payload request failed: ${response.status} ${response.statusText} - ${path}`,
    );
  }

  return response.json() as Promise<T>;
}
