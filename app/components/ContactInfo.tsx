import { Form } from "react-router";
import { Button } from "./Button";
import type { Settings } from "~/server/db/schema";

interface ContactInfoProps {
  settings?: Settings | null;
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
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="contactName"
            defaultValue={settings?.contactName || ""}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="contactPhone"
            defaultValue={settings?.contactPhone || ""}
            placeholder="Your phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="contactEmail"
            defaultValue={settings?.contactEmail || ""}
            placeholder="Your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" variant="primary" size="md">
          Save Contact Info
        </Button>
      </Form>
    </div>
  );
}
