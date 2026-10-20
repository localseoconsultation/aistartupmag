"use client";

import Button from "@/components/ui/Button";
import { BlogCategory } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().trim().max(120, "Search must be 120 characters or fewer"),
  category: z.string(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

type SearchFormProps = {
  query: string;
  selectedCategory: string;
  categories: BlogCategory[];
};

const SearchForm = ({
  query,
  selectedCategory,
  categories,
}: SearchFormProps) => {
  const router = useRouter();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query,
      category: selectedCategory,
    },
  });

  const currentQuery = useWatch({
    control,
    name: "query",
  });

  const onSubmit = (values: SearchFormValues) => {
    const params = new URLSearchParams();
    const trimmedQuery = values.query.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }

    if (values.category) {
      params.set("category", values.category);
    }

    const searchUrl = params.size ? `/search?${params.toString()}` : "/search";

    router.push(searchUrl);
  };

  const clearSearch = () => {
    setValue("query", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("category", "");

    router.push("/search");
  };

  return (
    <section className="relative overflow-hidden px-5 md:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        role="search"
      >
        <div className="flex items-center gap-3 border-b border-foreground py-3.5">
          <Search className="size-6 shrink-0" aria-hidden="true" />

          <input
            type="search"
            {...register("query")}
            placeholder="Search stories, topics, blogs..."
            aria-label="Search published stories"
            aria-invalid={Boolean(errors.query)}
            aria-describedby={errors.query ? "search-error" : undefined}
            className="min-w-0 flex-1 appearance-none bg-transparent text-lg outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />

          {currentQuery?.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              title="Clear search"
              className="shrink-0 p-1 text-muted transition-colors hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          )}

          <Button
            type="submit"
            disabled={!currentQuery?.trim() || isSubmitting}
            variant="primary"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>

        {errors.query && (
          <p id="search-error" className="text-sm text-red-600">
            {errors.query.message}
          </p>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
