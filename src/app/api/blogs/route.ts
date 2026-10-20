import { NextRequest, NextResponse } from "next/server";

import { getBlogs } from "@/lib/payload/blogs";
import { getCategoryBySlug } from "@/lib/payload/categories";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? "1");
    const categorySlug = searchParams.get("category");
    const query = searchParams.get("q")?.trim();

    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 },
      );
    }

    if (query && query.length > 120) {
      return NextResponse.json(
        { error: "Search query must be 120 characters or fewer" },
        { status: 400 },
      );
    }

    let categoryId: number | undefined;

    if (categorySlug) {
      const category = await getCategoryBySlug(categorySlug);

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 },
        );
      }

      categoryId = category.id;
    }

    const blogs = await getBlogs(page, categoryId, query);

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
