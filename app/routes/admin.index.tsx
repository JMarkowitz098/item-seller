import type { Route } from "./+types/admin.index";
import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { items as itemsTable } from "~/server/db/schema.js";
import { AdminItemsList } from "~/components/AdminItemsList";
import { requireAdminAuth } from "~/server/requireAuth";
import type { Item } from "~/components/ItemCard";
import { eq } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAdminAuth(request);
  try {
    const allItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.sold, false));
    return allItems as Item[];
  } catch (error) {
    console.error("Error loading items:", error);
    return [];
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin - My Stuff" },
    { name: "description", content: "Admin panel for managing items" },
  ];
}

export default function AdminIndex() {
  const items = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="p-8 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Items Management</h2>
        <a
          href="/admin/items/pdf"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Download PDF
        </a>
      </div>
      <AdminItemsList items={items} />
    </div>
  );
}
