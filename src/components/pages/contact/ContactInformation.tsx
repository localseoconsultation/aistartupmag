import Typography from "@/components/ui/Typography";
import type { ContactPageData } from "@/types/contactPage";

type Props = {
  data: ContactPageData["contactInformation"];
}

const ContactInformation = ({data}:Props) => {
  return (
    <div className="flex h-full w-full flex-col px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 bg-background">
      <Typography variant="eyebrow">{data.eyebrow}</Typography>

      <Typography variant="h2" className="mt-4 max-w-md">
        {data.title}
      </Typography>

      <div className="mt-12 space-y-8">
        {/* Coordinates */}
        <div>
          <Typography variant="caption" className="uppercase">
            {data.coordinates.address}
          </Typography>

          <div className="mt-3 space-y-1">
            <a
              href={`tel:${data.coordinates.phone}`}
              className="group block"
            >
              <Typography
                variant="body"
                className="transition-colors duration-300 group-hover:text-primary"
              >
                {data.coordinates.phone}
              </Typography>
            </a>

            <a
              href={`mailto:${data.coordinates.email}`}
              className="group block"
            >
              <Typography
                variant="body"
                className="transition-colors duration-300 group-hover:text-primary"
              >
                {data.coordinates.email}
              </Typography>
            </a>

            <Typography variant="body">
              {data.coordinates.address}
            </Typography>
          </div>
        </div>

        {/* Socials */}
        <div>
          <Typography variant="caption" className="uppercase">
            {data.socials.label}
          </Typography>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {data.socials.links.map((social) => (
              <a
                key={social.title}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase transition-colors duration-300 hover:text-primary"
              >
                {social.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
