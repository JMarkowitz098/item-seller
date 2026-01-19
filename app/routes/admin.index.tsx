import type { Route } from "./+types/admin.index";
import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { items as itemsTable } from "~/server/db/schema.js";
import { ItemsTable } from "~/components/ItemsTable";
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
        <div className="flex gap-2">
          <a
            href="/admin/items/pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Preview PDF
          </a>
          <a
            href="/admin/items/pdf"
            download="items.pdf"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download PDF
          </a>
        </div>
      </div>
      <ItemsTable
        items={items}
        title="Admin - My Stuff"
        showAddButton
        actions={[
          {
            type: "edit",
            label: "Edit",
            route: "",
          },
          {
            type: "mark-sold",
            label: "Mark as Sold",
            route: "/admin/mark-sold",
          },
          {
            type: "delete",
            label: "Delete",
            route: "/admin/items/delete",
          },
        ]}
      />
    </div>
  );
}
