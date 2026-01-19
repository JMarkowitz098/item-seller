import type { Route } from "./+types/admin.mark-unsold";
import { redirect } from "react-router";
import { updateItem } from "~/server/db/queries";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const formData = await request.formData();
  const id = parseInt(formData.get("id") as string);

  try {
    await updateItem(id, { sold: false });
    return redirect("/admin");
  } catch (error) {
    console.error("Error marking item as unsold:", error);
    return { error: "Failed to mark item as unsold" };
  }
}
