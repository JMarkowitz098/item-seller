import type { Route } from "./+types/admin.items._id_.edit";
import { redirect, useLoaderData } from "react-router";
import { ItemForm } from "~/components/ItemForm";
import { getItemById, updateItem } from "~/server/db/queries";
import type { Item } from "~/components/ItemCard";

export async function loader({ params }: Route.LoaderArgs) {
  const id = parseInt(params.id);
  const item = await getItemById(id);

  if (!item) {
    return redirect("/admin");
  }

  return item as Item;
}

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const id = parseInt(params.id);
  const formData = await request.formData();
  const label = formData.get("label") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image_path = formData.get("image_path") as string;

  try {
    await updateItem(id, { label, description, price, image_path });
    return redirect("/admin");
  } catch (error) {
    console.error("Error updating item:", error);
    return { error: "Failed to update item" };
  }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Edit ${data?.label || "Item"} - Admin` },
    { name: "description", content: "Edit an item" },
  ];
}

export default function EditItem() {
  const item = useLoaderData<typeof loader>();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Item</h1>
      <ItemForm item={item} />
    </main>
  );
}
