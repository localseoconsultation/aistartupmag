import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "light" | "primary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<
  ButtonVariant,
  {
    button: string;
    hover: string;
    text: string;
    hoverText: string;
  }
> = {
  default: {
    button: "bg-foreground",
    hover: "bg-primary",
    text: "text-background",
    hoverText: "group-hover:text-primary-foreground",
  },

  light: {
    button: "bg-background",
    hover: "bg-foreground",
    text: "text-foreground",
    hoverText: "group-hover:text-background",
  },

  primary: {
    button: "bg-primary",
    hover: "bg-foreground",
    text: "text-primary-foreground",
    hoverText: "group-hover:text-background",
  },
};

const Button = ({
  children,
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) => {
  const styles = variants[variant];

  return (
    <button
      type={type}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 text-center text-sm font-medium uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60",
        styles.button,
        styles.text,
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          styles.hoverText,
        )}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          styles.hover,
        )}
      />
    </button>
  );
};

export default Button;