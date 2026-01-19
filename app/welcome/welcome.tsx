import { useLoaderData } from "react-router";
import { db } from "~/server/db/index.js";
import { items as itemsTable } from "~/server/db/schema.js";
import { eq } from "drizzle-orm";

export type Item = {
  id: number;
  label: string;
  description: string;
  price: number;
  image_path: string;
};

export async function loader() {
  try {
    const allItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.sold, false));
    return allItems;
  } catch (error) {
    console.error("Error loading items:", error);
    return [];
  }
}

const renderItem = (item: Item) => {
  const { id, label, description, price, image_path } = item;
  return (
    <section key={String(id)} className="item-card">
      <img src={image_path} alt={label} className="item-image" />
      <div className="item-info">
        <p className="item-title">{description}</p>
        <p className="item-price">${String(price)}</p>
      </div>
    </section>
  );
};

export function Welcome() {
  const items = useLoaderData<typeof loader>();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Stuff</h1>
      {items.length === 0 ? (
        <p className="text-center">No items found</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => renderItem(item))}
        </div>
      )}
    </main>
  );
}
