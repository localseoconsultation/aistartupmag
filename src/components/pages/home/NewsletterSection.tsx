"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import {
  newsletterSchema,
  type NewsletterInput,
} from "@/validators/newsletter";
import type { NewsletterData } from "@/types/newsletter";

type Props = {
  data: NewsletterData;
};

const NewsletterSection = ({ data }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: NewsletterInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    router.push(data.successUrl);
  };

  return (
    <section className="bg-secondary-backgound px-5 py-20 md:px-8 md:py-26 lg:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <Typography variant="eyebrow">{data.eyebrow}</Typography>

        <Typography variant="h2" className="mx-auto mt-4 max-w-2xl">
          {data.title}
        </Typography>

        <Typography
          variant="body"
          className="mx-auto mt-5 max-w-xl text-foreground/65"
        >
          {data.description}
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="min-w-0 flex-1 text-left">
            <input
              type="email"
              placeholder={data.inputPlaceholder}
              disabled={isSubmitting}
              {...register("email")}
              className="h-12 w-full border border-foreground/15 bg-transparent px-4 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.email && (
              <Typography variant="caption" className="mt-2 text-primary">
                {errors.email.message}
              </Typography>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="h-12 shrink-0 px-7"
          >
            {isSubmitting ? data.buttonLoadingLabel : data.buttonLabel}
          </Button>
        </form>

        {data.note && (
          <Typography variant="caption" className="mt-5 text-foreground/40">
            {data.note}
          </Typography>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
