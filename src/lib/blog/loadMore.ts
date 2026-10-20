type LoadMoreResponse<T> = {
  docs: T[];
  hasNextPage: boolean;
  nextPage: number | null;
};

export async function loadMore<T>(
  endpoint: string,
  page: number,
  params?: Record<string, string>,
): Promise<LoadMoreResponse<T>> {
  const searchParams = new URLSearchParams({
    ...params,
    page: String(page),
  });

  const response = await fetch(`${endpoint}?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to load more data from ${endpoint}`);
  }

  return response.json() as Promise<LoadMoreResponse<T>>;
}
