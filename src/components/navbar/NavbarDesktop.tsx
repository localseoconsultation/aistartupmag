
import { Suspense } from "react";

import LinkButton from "../ui/LinkButton";
import NavbarLink from "./NavbarLink";
import NavbarSearch from "./NavbarSearch";
import { navbarConfig } from "@/lib/navbar";

const NavbarDesktop = () => {
  return (
    <nav className="hidden items-center gap-12 lg:flex">
      <ul className="flex items-center gap-12">
        {navbarConfig.links.map((link) => (
          <li key={link.url}>
            <Suspense fallback={<span className="inline-block h-6 w-16" />}>
              <NavbarLink title={link.title} url={link.url} />
            </Suspense>
          </li>
        ))}
      </ul>

      <NavbarSearch />

      <LinkButton
        title={navbarConfig.contact.title}
        url={navbarConfig.contact.url}
      />
    </nav>
  );
};

export default NavbarDesktop;