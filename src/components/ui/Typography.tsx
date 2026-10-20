import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "excerpt"
  | "bodyLarge"
  | "small"
  | "label"
  | "caption"
  | "eyebrow"
  | "displayNumber";

type TypographyProps = {
  children: ReactNode;
  variant?: TypographyVariant;
  className?: string;
};

const variants: Record<
  TypographyVariant,
  {
    element: keyof React.JSX.IntrinsicElements;
    className: string;
  }
> = {
  display: {
    element: "h1",
    className:
      "text-[40px] font-semibold leading-[1.05] tracking-tighter md:text-6xl md:leading-none md:tracking-[-0.04em] lg:text-7xl xl:text-[78px]",
  },

  h1: {
    element: "h1",
    className:
      "text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl",
  },

  h2: {
    element: "h2",
    className:
      "text-3xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-4xl lg:text-5xl",
  },

  h3: {
    element: "h3",
    className:
      "text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl",
  },

  bodyLarge: {
    element: "p",
    className:
      "text-base font-medium leading-relaxed text-foreground md:text-xl",
  },

  body: {
    element: "p",
    className:
      "text-base font-medium leading-relaxed text-foreground md:text-lg",
  },

  excerpt: {
    element: "p",
    className:
      "text-[15px] font-medium leading-relaxed text-foreground md:text-[16px]",
  },

  small: {
    element: "p",
    className: "text-sm leading-relaxed text-muted-foreground",
  },

  label: {
    element: "span",
    className: "text-sm font-medium leading-none text-foreground",
  },

  caption: {
    element: "span",
    className: "block text-xs leading-relaxed text-muted-foreground",
  },

  eyebrow: {
    element: "span",
    className: "text-xs font-semibold uppercase tracking-[0.12em] text-primary",
  },
  displayNumber: {
    element: "span",
    className:
      "text-[72px] leading-[1] font-semibold tracking-tighter text-foreground/5 md:text-[110px] lg:text-[140px] xl:text-[180px]",
  },
};

const Typography = ({
  children,
  variant = "body",
  className,
}: TypographyProps) => {
  const { element: Element, className: variantClassName } = variants[variant];

  return (
    <Element className={cn(variantClassName, className)}>{children}</Element>
  );
};

export default Typography;
