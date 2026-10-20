"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { navbarConfig } from "@/lib/navbar";

type NavbarSearchProps = {
  mobile?: boolean;
  onClick?: () => void;
};

const NavbarSearch = ({ mobile = false, onClick }: NavbarSearchProps) => {
  const { title, url } = navbarConfig.search;

  if (mobile) {
    return (
      <Link
        href={url}
        onClick={onClick}
        aria-label={title}
        className="group relative flex items-center gap-4 border-b border-border px-1 py-5 font-medium text-foreground transition-colors duration-300"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
        />

        <Search
          size={18}
          strokeWidth={1.8}
          className="relative z-10 transition-colors duration-300 group-hover:text-background"
        />

        <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
          {title}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={url}
      aria-label={title}
      className="group flex items-center gap-2 text-sm font-medium uppercase text-foreground transition-colors duration-200 hover:text-primary"
    >
      <Search
        size={18}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      <span>{title}</span>
    </Link>
  );
};

export default NavbarSearch;
