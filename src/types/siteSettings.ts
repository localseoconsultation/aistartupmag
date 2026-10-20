export type SiteSocial = {
  id?: string | null;
  platform: "linkedin" | "instagram" | "x" | "facebook" | "youtube";
  title: string;
  url: string;
  label: string;
};

export type SiteLogo = {
  image: {
    url: string;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  };
  alt: string;
  href: string;
  width: number;
  height: number;
};

export type SiteSettingsData = {
  branding: {
    logo: SiteLogo;
    description: string;
    copyrightYear: number;
    copyright: string;
  };
  socials: SiteSocial[];
};