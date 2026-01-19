import type { Route } from "./+types/admin.contact";
import { redirect, useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { settings as settingsTable } from "~/server/db/schema.js";
import { ContactInfo } from "~/components/ContactInfo";
import { requireAdminAuth } from "~/server/requireAuth";
import type { Settings } from "~/server/db/schema";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAdminAuth(request);
  try {
    const settingsData = await db.select().from(settingsTable).limit(1);
    return (settingsData[0] || null) as Settings | null;
  } catch (error) {
    console.error("Error loading settings:", error);
    return null;
  }
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const { updateSettings } = await import("~/server/db/queries");
  const formData = await request.formData();
  const contactName = formData.get("contactName") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const contactEmail = formData.get("contactEmail") as string;

  try {
    await updateSettings({ contactName, contactPhone, contactEmail });
    return redirect("/admin/contact");
  } catch (error) {
    console.error("Error updating contact info:", error);
    return { error: "Failed to update contact info" };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Info - Admin" },
    { name: "description", content: "Manage contact information" },
  ];
}

export default function ContactPage() {
  const settings = useLoaderData<typeof loader>();

  return (
    <main className="p-8">
      <ContactInfo settings={settings} />
    </main>
  );
}
