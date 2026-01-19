import { db } from "~/server/db/index.js";
import { items } from "~/server/db/schema.js";

export async function loader() {
  try {
    const allItems = await db.select().from(items);
    return Response.json(allItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json(
      { error: "Failed to fetch items", details: String(error) },
      { status: 500 }
    );
  }
}
