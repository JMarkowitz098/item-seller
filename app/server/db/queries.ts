import { db } from "./index.js";
import { items, settings } from "./schema.js";
import { eq } from "drizzle-orm";
import type { NewItem, Item, Settings, NewSettings } from "./schema.js";

export async function createItem(item: NewItem): Promise<Item | null> {
  const result = await db.insert(items).values(item).returning();
  return result[0] || null;
}

export async function updateItem(
  id: number,
  item: Partial<NewItem>,
): Promise<Item | null> {
  const result = await db
    .update(items)
    .set(item)
    .where(eq(items.id, id))
    .returning();
  return result[0] || null;
}

export async function deleteItem(id: number): Promise<boolean> {
  const result = await db.delete(items).where(eq(items.id, id));
  return result.rowsAffected > 0;
}

export async function getItemById(id: number): Promise<Item | null> {
  const result = await db.select().from(items).where(eq(items.id, id));
  return result[0] || null;
}

export async function getAllItems(): Promise<Item[]> {
  return await db.select().from(items).where(eq(items.sold, false));
}

export async function getSoldItems(): Promise<Item[]> {
  return await db.select().from(items).where(eq(items.sold, true));
}

export async function getSettings(): Promise<Settings | null> {
  const result = await db.select().from(settings).limit(1);
  return result[0] || null;
}

export async function updateSettings(
  data: Partial<NewSettings>,
): Promise<Settings | null> {
  const existing = await getSettings();
  if (existing) {
    const result = await db
      .update(settings)
      .set(data)
      .where(eq(settings.id, existing.id))
      .returning();
    return result[0] || null;
  } else {
    const result = await db.insert(settings).values(data).returning();
    return result[0] || null;
  }
}
