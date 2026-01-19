import { Link } from "react-router";
import { ActionButton } from "./ActionButton";
import type { Item } from "./ItemCard";

interface Action {
  type: "edit" | "delete" | "mark-sold" | "mark-unsold";
  label: string;
  route: string;
  confirmMessage?: string;
}

interface ItemsTableProps {
  items: Item[];
  title: string;
  showAddButton?: boolean;
  actions: Action[];
}

export function ItemsTable({
  items,
  title,
  showAddButton = false,
  actions,
}: ItemsTableProps) {
  const handleDelete = (e: React.FormEvent) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      e.preventDefault();
    }
  };

  const renderAction = (action: Action, itemId: number) => {
    if (action.type === "edit") {
      return (
        <Link
          key={action.type}
          to={`/admin/items/${itemId}/edit`}
          className="inline-block"
        >
          <ActionButton actionType="edit">Edit</ActionButton>
        </Link>
      );
    }

    return (
      <form
        key={action.type}
        action={action.route}
        method="post"
        style={{ display: "inline" }}
        onSubmit={action.type === "delete" ? handleDelete : undefined}
      >
        <input type="hidden" name="id" value={itemId} />
        <ActionButton actionType={action.type} type="submit">
          {action.label}
        </ActionButton>
      </form>
    );
  };

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {showAddButton && (
          <Link to="/admin/items/new">
            <ActionButton actionType="submit">Add Item</ActionButton>
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-center">No items found</p>
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
                    {actions.map((action) => renderAction(action, item.id))}
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
