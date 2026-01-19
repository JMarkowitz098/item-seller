import { redirect } from "react-router";
import { getSession } from "./session";

export async function requireAdminAuth(request: Request) {
  if (process.env.SKIP_AUTH === "true") {
    return null;
  }

  const session = await getSession(request);
  const isAuthenticated =
    session.has("authenticated") && session.get("authenticated");
  const is2FAVerified = session.get("2faVerified");

  if (!isAuthenticated || !is2FAVerified) {
    throw redirect("/login");
  }

  return session;
}
