"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

type NavbarLinkProps = {
  title: string;
  url: string;
  mobile?: boolean;
  onClick?: () => void;
};

const NavbarLink = ({
  title,
  url,
  mobile = false,
  onClick,
}: NavbarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === url || (url !== "/" && pathname.startsWith(`${url}/`));

  if (mobile) {
    return (
      <Link
        href={url}
        onClick={onClick}
        className={`group relative flex items-center justify-between border-b border-border px-1 py-5 font-medium transition-colors duration-300 ${
          isActive ? "text-primary" : "text-foreground"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
        />

        <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
          {title}
        </span>

        <ArrowUpRight
          size={24}
          strokeWidth={1.8}
          className={`relative z-10 shrink-0 transition-all duration-300 ${
            isActive ? "text-primary" : "text-border"
          } group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-background`}
        />
      </Link>
    );
  }

  return (
    <Link
      href={url}
      className={`group relative inline-block py-1 text-sm font-medium uppercase transition-colors duration-200 ${
        isActive ? "text-primary" : "text-foreground hover:text-primary"
      }`}
    >
      {title}

      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-px w-full bg-primary transition-transform duration-300 ${
          isActive
            ? "scale-x-100"
            : "origin-left scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
};

export default NavbarLink;
