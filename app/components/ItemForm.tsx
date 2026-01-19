import { Form } from "react-router";
import { Button } from "./Button";
import type { Item } from "./ItemCard";

export function ItemForm({
  item,
  isLoading = false,
}: {
  item?: Item;
  isLoading?: boolean;
}) {
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="space-y-4 max-w-2xl"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Label</label>
        <input
          type="text"
          name="label"
          defaultValue={item?.label || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          name="description"
          defaultValue={item?.description || ""}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        {item?.image_path && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Current image:</p>
            <img
              src={item.image_path}
              alt={item.label}
              className="max-w-xs max-h-48 rounded"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          size="md"
        >
          {isLoading ? "Saving..." : item ? "Update Item" : "Create Item"}
        </Button>
        {item && (
          <Button
            type="submit"
            name="_action"
            value="mark-as-sold"
            disabled={isLoading}
            variant="warning"
            size="md"
          >
            Mark as Sold
          </Button>
        )}
      </div>
    </Form>
  );
}
