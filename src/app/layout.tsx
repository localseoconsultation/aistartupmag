import type { ReactNode } from "react";
import "./globals.css";

import { Inter } from "next/font/google";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import CustomCodeInjector from "@/components/shared/CustomCodeInjector";

import { getSiteSettings } from "@/lib/payload/pages/getSiteSettings";
import { getCustomCode } from "@/lib/payload/pages/getCustomCode";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const [siteSettings, customCode] = await Promise.all([
    getSiteSettings(),
    getCustomCode(),
  ]);

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        {/* Custom head snippets */}
        <CustomCodeInjector id="head" html={customCode?.head} />
      </head>

      <body>
        {/* Custom snippets intended for the start of body */}
        <CustomCodeInjector id="body-start" html={customCode?.bodyStart} />

        <Navbar siteSettings={siteSettings} />

        {children}

        <Footer siteSettings={siteSettings} />

        {/* Custom snippets intended for the end of body */}
        <CustomCodeInjector id="footer" html={customCode?.footer} />
      </body>
    </html>
  );
}
