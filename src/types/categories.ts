export type BlogCategory = {
  id: number;
  name: string;
  generateSlug: boolean;
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

export type BlogCategoriesResponse = {
  docs: BlogCategory[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};