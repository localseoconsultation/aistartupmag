import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/ui/Typography";
import { getPayloadImageUrl } from "@/lib/payload/image";
import type { SiteSettingsData } from "@/types/siteSettings";

type FooterBrandProps = {
  branding: SiteSettingsData["branding"];
};

const FooterBrand = ({ branding }: FooterBrandProps) => {
  const { logo } = branding;
  const logoSrc = logo.image?.url
    ? getPayloadImageUrl(logo.image.url)
    : null;

  return (
    <div>
      {logoSrc && (
        <Link href={logo.href} className="inline-block" aria-label={logo.alt}>
          <Image
            src={logoSrc}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-auto w-52 brightness-0 invert md:w-60"
          />
        </Link>
      )}

      <Typography
        variant="small"
        className="mt-6 max-w-sm text-background/55"
      >
        {branding.description}
      </Typography>

      <Typography
        variant="caption"
        className="mt-8 text-background/35"
      >
        &copy; {branding.copyrightYear} {branding.copyright}
      </Typography>
    </div>
  );
};

export default FooterBrand;