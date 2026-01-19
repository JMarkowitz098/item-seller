import type { Route } from "./+types/admin.items.delete";
import { redirect } from "react-router";
import { deleteItem, getItemById } from "~/server/db/queries";
import { deleteImage } from "~/server/imageHandler";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const formData = await request.formData();
  const id = parseInt(formData.get("id") as string);

  try {
    // Get item to delete its image
    const item = await getItemById(id);
    if (item?.image_path) {
      deleteImage(item.image_path);
    }

    await deleteItem(id);
    return redirect("/admin");
  } catch (error) {
    console.error("Error deleting item:", error);
    return { error: "Failed to delete item" };
  }
}

// This route doesn't render anything, just handles the action
export default function DeleteItem() {
  return null;
}
