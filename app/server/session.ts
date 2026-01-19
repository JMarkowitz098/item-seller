import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "dev-secret-key"],
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
});

export async function createSession(
  request: Request,
  userId: string = "admin"
) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("authenticated", true);
  session.set("2faVerified", true);

  return sessionStorage.commitSession(session);
}

export async function destroySession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return sessionStorage.destroySession(session);
}

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}
