import { footerConfig } from "@/lib/footer";
import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";
import FooterMark from "./FooterMark";
import type { SiteSettingsData } from "@/types/siteSettings";

type FooterProps = {
  siteSettings: SiteSettingsData;
};

const Footer = ({ siteSettings }: FooterProps) => {
  const { navigation } = footerConfig;

  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="relative z-10">
        <section className="px-5 pt-20 md:px-8 md:pt-24 lg:pt-28">
          <div className="mx-auto grid max-w-400 gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <FooterBrand branding={siteSettings.branding} />

            <FooterColumn
              title={navigation.explore.title}
              links={navigation.explore.links}
            />

            <FooterColumn
              title={navigation.company.title}
              links={navigation.company.links}
            />

            <FooterColumn
              title="Social"
              links={siteSettings.socials.map(
                ({ title, url, label }) => ({
                  title,
                  url,
                  label,
                }),
              )}
            />
          </div>
        </section>

        <FooterMark logo={siteSettings.branding.logo} />
      </div>
    </footer>
  );
};

export default Footer;