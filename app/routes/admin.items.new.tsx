import type { Route } from "./+types/admin.items.new";
import { redirect } from "react-router";
import { ItemForm } from "~/components/ItemForm";
import { createItem } from "~/server/db/queries";
import { handleImageUpload } from "~/server/imageHandler";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const formData = await request.formData();
  const label = formData.get("label") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);

  let image_path = "/images/placeholder.jpg"; // default

  // Handle image upload if provided
  const imagePath = await handleImageUpload(formData);
  if (imagePath) {
    image_path = imagePath;
  }

  try {
    await createItem({ label, description, price, image_path });
    return redirect("/admin");
  } catch (error) {
    console.error("Error creating item:", error);
    return { error: "Failed to create item" };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Item - Admin" },
    { name: "description", content: "Create a new item" },
  ];
}

export default function NewItem() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Create Item</h1>
      <ItemForm />
    </main>
  );
}
