import { ItemCard, type Item } from "./ItemCard";

export function ItemsIndex({ items }: { items: Item[] }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Stuff</h1>
      {items.length === 0 ? (
        <p className="text-center">No items found</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
