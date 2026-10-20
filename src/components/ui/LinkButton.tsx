import Link from "next/link";

type LinkButtonVariant = "default" | "light" | "primary";

type LinkButtonProps = {
  title: string;
  url: string;
  className?: string;
  variant?: LinkButtonVariant;
};

const variants: Record<
  LinkButtonVariant,
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

const LinkButton = ({
  title,
  url,
  className = "",
  variant = "default",
}: LinkButtonProps) => {
  const styles = variants[variant];

  return (
    <Link
      href={url}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-6 py-3.5 text-center text-sm font-medium uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${styles.button} ${styles.text} ${className}`}
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${styles.hoverText}`}
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${styles.hover}`}
      />
    </Link>
  );
};

export default LinkButton;
