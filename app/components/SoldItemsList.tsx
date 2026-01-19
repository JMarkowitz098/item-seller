import { Form, Link } from "react-router";
import { updateItem } from "~/server/db/queries";
import type { Item } from "./ItemCard";

export function SoldItemsList({ items }: { items: Item[] }) {
  const handleMarkAsUnsold = async (itemId: number) => {
    await updateItem(itemId, { sold: false });
    window.location.href = "/admin";
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Sold Items</h1>

      {items.length === 0 ? (
        <p className="text-center">No sold items found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Label</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2 text-sm">{item.image_path}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/admin/items/${item.id}/edit`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <Form
                      method="post"
                      action="/admin/mark-unsold"
                      style={{ display: "inline" }}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Mark as Unsold
                      </button>
                    </Form>
                    <form
                      action="/admin/items/delete"
                      method="post"
                      style={{ display: "inline" }}
                      onSubmit={(e) => {
                        if (
                          !confirm("Are you sure you want to delete this item?")
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
