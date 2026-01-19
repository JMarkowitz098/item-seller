import type { Route } from "./+types/admin.index";
import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { items as itemsTable } from "~/server/db/schema.js";
import { AdminItemsList } from "~/components/AdminItemsList";
import { requireAdminAuth } from "~/server/requireAuth";
import type { Item } from "~/components/ItemCard";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAdminAuth(request);
  try {
    const allItems = await db.select().from(itemsTable);
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
  return <AdminItemsList items={items} />;
}
