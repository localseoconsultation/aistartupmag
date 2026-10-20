"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import type { PayloadForm, PayloadFormField } from "@/types/contactPage";

type Props = {
  form: PayloadForm;
  payloadUrl: string;
};

const getInitialValues = (fields: PayloadFormField[]) =>
  Object.fromEntries(
    fields
      .filter(
        (field): field is PayloadFormField & { name: string } =>
          typeof field.name === "string" && field.name.length > 0,
      )
      .map((field) => [
        field.name,
        field.defaultValue ?? (field.blockType === "checkbox" ? false : ""),
      ]),
  );

const PayloadContactForm = ({ form, payloadUrl }: Props) => {
  const router = useRouter();

  const fields = form.fields ?? [];

  const [values, setValues] = useState<Record<string, unknown>>(() =>
    getInitialValues(fields),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const updateValue = (name: string, value: unknown) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setStatus("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const name = field.name;

      if (!name || field.required !== true) continue;

      const value = values[name];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        nextErrors[name] = `${field.label || "This field"} is required.`;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("Please complete the required fields.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const submissionData = fields.flatMap((field) => {
        const name = field.name;

        if (
          !name ||
          field.blockType === "message" ||
          values[name] === undefined
        ) {
          return [];
        }

        return [
          {
            field: name,
            value: values[name],
          },
        ];
      });

      const response = await fetch(
        `${payloadUrl.replace(/\/+$/, "")}/api/form-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: form.id,
            submissionData,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to submit your message. Please try again.");
      }

      if (form.confirmationType === "redirect") {
        const redirectUrl =
          typeof form.redirect === "object" && form.redirect !== null
            ? form.redirect.url
            : undefined;

        if (redirectUrl) {
          const target = new URL(redirectUrl, window.location.origin);

          // Allow redirects only to the current frontend origin.
          if (target.origin !== window.location.origin) {
            throw new Error(
              "The configured confirmation URL must use this website's origin.",
            );
          }

          router.push(`${target.pathname}${target.search}${target.hash}`);
          return;
        }
      }

      setValues(getInitialValues(fields));
      setErrors({});
      setStatus("Your message has been submitted successfully.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6">
      {fields.map((field, index) => {
        if (field.blockType === "message") {
          return (
            <div key={field.id ?? `message-${index}`}>
              <Typography variant="body">{field.label}</Typography>
            </div>
          );
        }

        const name = field.name;

        if (!name) return null;

        const value = values[name];
        const error = errors[name];
        const controlClassName = "contact-input";

        return (
          <div key={field.id ?? name}>
            {field.blockType !== "checkbox" && (
              <Typography
                variant="caption"
                className="mb-2 block uppercase tracking-[0.12em] text-muted-foreground"
              >
                {field.label}
                {field.required === true ? " *" : ""}
              </Typography>
            )}

            {field.blockType === "textarea" ? (
              <textarea
                name={name}
                rows={7}
                required={field.required === true}
                placeholder={field.placeholder}
                value={String(value ?? "")}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                onChange={(event) => updateValue(name, event.target.value)}
                className={`${controlClassName} min-h-44 resize-y py-4`}
              />
            ) : field.blockType === "select" ? (
              <select
                name={name}
                required={field.required === true}
                value={String(value ?? "")}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                onChange={(event) => updateValue(name, event.target.value)}
                className={controlClassName}
              >
                <option value="">
                  {field.placeholder || "Select an option"}
                </option>

                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.blockType === "radio" ? (
              <div className="space-y-3">
                {(field.options ?? []).map((option) => (
                  <label key={option.value} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={value === option.value}
                      required={field.required === true}
                      disabled={isSubmitting}
                      onChange={() => updateValue(name, option.value)}
                    />

                    <Typography variant="body">{option.label}</Typography>
                  </label>
                ))}
              </div>
            ) : field.blockType === "checkbox" ? (
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name={name}
                  checked={Boolean(value)}
                  required={field.required === true}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(error)}
                  onChange={(event) => updateValue(name, event.target.checked)}
                  className="mt-1"
                />

                <Typography variant="caption">
                  {field.label}
                  {field.required === true ? " *" : ""}
                </Typography>
              </label>
            ) : (
              <input
                type={
                  field.blockType === "email"
                    ? "email"
                    : field.blockType === "number"
                      ? "number"
                      : field.blockType === "date"
                        ? "date"
                        : "text"
                }
                name={name}
                required={field.required === true}
                placeholder={field.placeholder}
                value={String(value ?? "")}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                onChange={(event) => {
                  const inputValue = event.target.value;

                  updateValue(
                    name,
                    field.blockType === "number" && inputValue !== ""
                      ? Number(inputValue)
                      : inputValue,
                  );
                }}
                className={controlClassName}
              />
            )}

            {error && (
              <Typography variant="caption" className="mt-2 block text-primary">
                <span id={`${name}-error`}>{error}</span>
              </Typography>
            )}
          </div>
        );
      })}

      <div className="flex flex-col items-start gap-4 pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="h-12 px-7"
        >
          {isSubmitting
            ? "Submitting..."
            : form.submitButtonLabel || "Send Message"}
        </Button>
      </div>

      {status && (
        <Typography variant="caption" className="text-foreground/70">
          {status}
        </Typography>
      )}
    </form>
  );
};

export default PayloadContactForm;
