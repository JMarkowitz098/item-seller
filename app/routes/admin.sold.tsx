import type { Route } from "./+types/admin.sold";
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
    const soldItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.sold, true));
    return soldItems as Item[];
  } catch (error) {
    console.error("Error loading sold items:", error);
    return [];
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sold Items - Admin" },
    { name: "description", content: "Admin panel for sold items" },
  ];
}

export default function SoldIndex() {
  const items = useLoaderData<typeof loader>();
  return (
    <ItemsTable
      items={items}
      title="Sold Items"
      actions={[
        {
          type: "edit",
          label: "Edit",
          route: "",
        },
        {
          type: "mark-unsold",
          label: "Mark as Unsold",
          route: "/admin/mark-unsold",
        },
        {
          type: "delete",
          label: "Delete",
          route: "/admin/items/delete",
        },
      ]}
    />
  );
}
