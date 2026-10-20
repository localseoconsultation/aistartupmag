import { Loader2 } from "lucide-react";

type LoadMoreButtonVariant = "default" | "light" | "primary";

type LoadMoreButtonProps = {
  title?: string;
  loadingTitle?: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: LoadMoreButtonVariant;
};

const variants: Record<
  LoadMoreButtonVariant,
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

const LoadMoreButton = ({
  title = "Load More Stories",
  loadingTitle = "Loading...",
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  variant = "default",
}: LoadMoreButtonProps) => {
  const styles = variants[variant];

  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 text-center text-sm font-medium uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60 ${styles.button} ${styles.text} ${className}`}
    >
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${styles.hoverText}`}
      >
        <span>{isLoading ? loadingTitle : title}</span>
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${styles.hover}`}
      />
    </button>
  );
};

export default LoadMoreButton;
