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
  const url = `${PAYLOAD_URL?.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  const start = performance.now();

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Payload #${requestNumber}] → ${fetchOptions.method ?? "GET"} ${path}`,
    );
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        Authorization: `users API-Key ${PAYLOAD_API_KEY}`,
        ...fetchOptions.headers,
      },
      next: {
        ...fetchOptions.next,
        revalidate,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Payload request failed: ${response.status} ${response.statusText} - ${path}`,
      );
    }

    const data = (await response.json()) as T;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Payload #${requestNumber}] ← ${response.status} ${path} (${Math.round(
          performance.now() - start,
        )}ms)`,
      );
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[Payload #${requestNumber}] ✕ ${path} (${Math.round(
          performance.now() - start,
        )}ms)`,
        error,
      );
    }

    throw error;
  }
}
