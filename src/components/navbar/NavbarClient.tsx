"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import type { LogoData } from "@/types/logo";
import { getPayloadImageUrl } from "@/lib/payload/image";

type Props = {
  logo: LogoData;
};

const NavbarClient = ({ logo }: Props) => {
  const { scrollY } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const showHeaderBackground = isScrolled || isMenuOpen;
  const logoSrc = getPayloadImageUrl(logo.image.url);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: showHeaderBackground
            ? "rgba(245, 245, 242, 0.7)"
            : "rgba(245, 245, 242, 0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-5 py-4 md:px-8 md:py-5"
        style={{
          backdropFilter: showHeaderBackground ? "blur(16px)" : "blur(0px)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link href={logo.href} aria-label={logo.alt} onClick={closeMenu}>
            <Image
              src={logoSrc}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              priority
              className="h-auto w-34 md:w-40"
            />
          </Link>

          <NavbarDesktop />

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-1.5">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 3.5 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block h-0.5 w-5 bg-foreground"
              />

              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -3.5 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block h-0.5 w-5 bg-foreground"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && <NavbarMobile isOpen={isMenuOpen} onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
};

export default NavbarClient;
