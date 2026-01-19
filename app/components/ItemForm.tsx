import { Form } from "react-router";
import type { Item } from "./ItemCard";

export function ItemForm({
  item,
  isLoading = false,
}: {
  item?: Item;
  isLoading?: boolean;
}) {
  return (
    <Form method="post" className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Label</label>
        <input
          type="text"
          name="label"
          defaultValue={item?.label || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          name="description"
          defaultValue={item?.description || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          step="0.01"
          defaultValue={item?.price || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image Path</label>
        <input
          type="text"
          name="image_path"
          defaultValue={item?.image_path || ""}
          placeholder="/images/item.jpg"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : item ? "Update Item" : "Create Item"}
      </button>
    </Form>
  );
}
