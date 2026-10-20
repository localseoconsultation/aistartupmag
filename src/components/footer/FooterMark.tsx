import Image from "next/image";

import { getPayloadImageUrl } from "@/lib/payload/image";
import type { SiteSettingsData } from "@/types/siteSettings";

type FooterMarkProps = {
  logo: SiteSettingsData["branding"]["logo"];
};

const FooterMark = ({ logo }: FooterMarkProps) => {
  const logoSrc = logo.image?.url
    ? getPayloadImageUrl(logo.image.url)
    : null;

  if (!logoSrc) return null;

  return (
    <div className="relative mt-12 w-full overflow-hidden bg-foreground">
      <Image
        src={logoSrc}
        alt=""
        width={logo.width || 1920}
        height={logo.height || 1080}
        aria-hidden="true"
        className="h-auto w-full opacity-5 brightness-0 invert mask-[linear-gradient(to_bottom,black_0%,black_25%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_25%,transparent_90%)]"
      />
    </div>
  );
};

export default FooterMark;