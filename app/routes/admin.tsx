import { Outlet, Form } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <a href="/admin" className="hover:underline">
              Items
            </a>
            <Form
              method="post"
              action="/admin/logout"
              style={{ display: "inline" }}
            >
              <button
                type="submit"
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
