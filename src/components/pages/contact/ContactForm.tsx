"use client";

import Typography from "@/components/ui/Typography";
import type { ContactPageData } from "@/types/contactPage";
import PayloadContactForm from "./PayloadContactForm";

type Props = {
  data: ContactPageData["contactForm"];
};

const ContactForm = ({ data }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Typography variant="eyebrow">{data.eyebrow}</Typography>

      <Typography variant="h2" className="mt-4">
        {data.title}
      </Typography>

      <Typography variant="body" className="mt-5 max-w-2xl text-foreground/70">
        {data.description}
      </Typography>

      <PayloadContactForm
        form={data.form}
        payloadUrl={process.env.NEXT_PUBLIC_PAYLOAD_URL!}
      />
    </div>
  );
};

export default ContactForm;
