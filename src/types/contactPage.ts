import { SEOData } from "./seo";

export type PayloadFormField = {
  id?: string;
  name?: string;
  label?: string;
  blockType: string;
  required?: boolean | null;
  defaultValue?: string | number | boolean | null;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
};

export type PayloadForm = {
  id: number | string;
  title?: string;
  fields: PayloadFormField[];
  submitButtonLabel?: string;
  confirmationType?: "message" | "redirect";
  confirmationMessage?: unknown;
  redirect?: {
    url?: string | null;
  } | null;
};

export type ContactPageData = {
  hero: {
    title: string;
    description: string;
  };
  contactInformation: {
    eyebrow: string;
    title: string;
    coordinates: {
      email?: string;
      phone?: string;
      address?: string;
    };
    socials: {
      label: string;
      links: {
        id?: string;
        title: string;
        url: string;
      }[];
    };
  };
  contactForm: {
    eyebrow: string;
    title: string;
    description: string;
    form: PayloadForm;
  };
  seo?: SEOData | null;
};
