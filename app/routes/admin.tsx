import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <a href="/admin" className="hover:underline">
            Items
          </a>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
