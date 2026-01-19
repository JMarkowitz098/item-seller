import type { Route } from "./+types/login";
import { redirect, useActionData } from "react-router";
import { verifyPassword, verifyTOTP } from "~/server/auth";
import { createSession, getSession } from "~/server/session";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  if (session.has("authenticated") && session.get("2faVerified")) {
    return redirect("/admin");
  }
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") return null;

  const formData = await request.formData();
  const password = formData.get("password") as string;
  const totp = formData.get("totp") as string;

  const passwordValid = await verifyPassword(password);
  if (!passwordValid) {
    return { error: "Invalid password" };
  }

  const totpValid = verifyTOTP(totp || "");
  if (!totpValid) {
    return { error: "Invalid 2FA code" };
  }

  const cookieHeader = await createSession(request);
  return redirect("/admin", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        {actionData?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {actionData.error}
          </div>
        )}

        <form method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter admin password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              2FA Code (6 digits)
            </label>
            <input
              type="text"
              name="totp"
              pattern="[0-9]{6}"
              maxLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="000000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank if 2FA not set up
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          For development: Set SKIP_AUTH=true in .env
        </p>
      </div>
    </main>
  );
}
