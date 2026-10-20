const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aistartupmag.com"
).replace(/\/+$/, "");

export const defaultSEO = {
  SITE_NAME: "AI Startup Magazine",
  SITE_URL,
  DEFAULT_TITLE: "AI Startup Magazine | AI News, Startups & Innovation",
  DEFAULT_DESCRIPTION:
    "Discover AI startups, emerging technologies, industry insights, funding news, and the founders building the future of artificial intelligence.",
};

export const getCanonicalUrl = (
  path: string,
  canonicalOverride?: string | null,
): string => {
  const override = canonicalOverride?.trim();

  if (override) {
    return new URL(override, `${defaultSEO.SITE_URL}/`).toString();
  }

  const normalizedPath = path.replace(/^\/+|\/+$/g, "");

  return new URL(normalizedPath, `${defaultSEO.SITE_URL}/`).toString();
};
