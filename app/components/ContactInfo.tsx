import { Form } from "react-router";
import { Button } from "./Button";
import type { Settings } from "~/server/db/schema";

interface ContactInfoProps {
  settings?: Settings | null;
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  defaultValue: string;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  defaultValue,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export function ContactInfo({ settings }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <Form
        method="post"
        action="/admin/contact"
        className="space-y-4 max-w-2xl"
      >
        <FormField
          label="Name"
          name="contactName"
          type="text"
          placeholder="Your name"
          defaultValue={settings?.contactName || ""}
        />

        <FormField
          label="Phone"
          name="contactPhone"
          type="tel"
          placeholder="Your phone number"
          defaultValue={settings?.contactPhone || ""}
        />

        <FormField
          label="Email"
          name="contactEmail"
          type="email"
          placeholder="Your email"
          defaultValue={settings?.contactEmail || ""}
        />

        <Button type="submit" variant="primary" size="md">
          Save Contact Info
        </Button>
      </Form>
    </div>
  );
}
