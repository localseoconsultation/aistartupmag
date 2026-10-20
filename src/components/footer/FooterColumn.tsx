import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Typography from "@/components/ui/Typography";

type FooterColumnProps = {
  title: string;
  links: readonly {
    title: string;
    url: string;
  }[];
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div>
      <Typography variant="label" className="text-background/35">
        {title}
      </Typography>

      <nav className="flex flex-col items-start gap-3 mt-5">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="group flex items-center gap-1.5 text-sm text-background/70 transition-colors duration-300 hover:text-primary"
          >
            <span>{link.title}</span>

            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterColumn;
