import type { Route } from "./+types/admin.logout";
import { redirect } from "react-router";
import { destroySession } from "~/server/session";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return null;
  }

  const cookieHeader = await destroySession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}

export default function Logout() {
  return null;
}
