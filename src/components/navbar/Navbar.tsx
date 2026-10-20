import NavbarClient from "./NavbarClient";
import type { SiteSettingsData } from "@/types/siteSettings";

type Props = {
  siteSettings: SiteSettingsData;
};

const Navbar = ({ siteSettings }: Props) => {
  return <NavbarClient logo={siteSettings.branding.logo} />;
};

export default Navbar;