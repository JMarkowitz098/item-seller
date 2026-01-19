import { Outlet, Form, useLocation } from "react-router";
import { Button } from "~/components/Button";

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "underline text-blue-300"
      : "hover:underline";
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <a href="/admin" className={isActive("/admin")}>
              Items
            </a>
            <a href="/admin/sold" className={isActive("/admin/sold")}>
              Sold Items
            </a>
            <a href="/admin/contact" className={isActive("/admin/contact")}>
              Contact Info
            </a>
            <a
              href="/"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <Form
              method="post"
              action="/admin/logout"
              style={{ display: "inline" }}
            >
              <Button type="submit" variant="danger" size="sm">
                Logout
              </Button>
            </Form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
