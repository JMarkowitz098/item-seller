import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { items as itemsTable } from "~/server/db/schema.js";
import { ItemsIndex } from "~/components/ItemsIndex";
import type { Item } from "~/components/ItemCard";
import { eq } from "drizzle-orm";

export async function loader() {
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
    { title: "My Stuff" },
    { name: "description", content: "My items collection" },
  ];
}

export default function Home() {
  const items = useLoaderData<typeof loader>();
  return <ItemsIndex items={items} />;
}
