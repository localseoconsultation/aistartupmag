"use client";

import { Suspense } from "react";
import { motion } from "motion/react";

import LinkButton from "../ui/LinkButton";
import NavbarLink from "./NavbarLink";
import NavbarSearch from "./NavbarSearch";
import { navbarConfig } from "@/lib/navbar";

type NavbarMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NavbarMobile = ({ isOpen, onClose }: NavbarMobileProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="fixed inset-0 z-40 bg-background lg:hidden"
    >
      <nav className="flex h-dvh flex-col px-5 pt-24 pb-0 md:px-8 md:pt-28">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {/* Search */}
            <motion.li
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NavbarSearch mobile onClick={onClose} />
            </motion.li>

            {/* Navigation */}
            {navbarConfig.links.map((link, index) => (
              <motion.li
                key={link.url}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: (index + 1) * 0.05,
                }}
              >
                <Suspense
                  fallback={<div className="h-16.25 border-b border-border" />}
                >
                  <NavbarLink
                    title={link.title}
                    url={link.url}
                    mobile
                    onClick={onClose}
                  />
                </Suspense>
              </motion.li>
            ))}
          </ul>

          {/* Contact */}
          <div className="my-8 w-full">
            <LinkButton
              title={navbarConfig.contact.title}
              url={navbarConfig.contact.url}
              className="w-full p-6"
            />
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default NavbarMobile;
