import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("admin", "routes/admin.tsx", [
    route("", "routes/admin.index.tsx"),
    route("items/new", "routes/admin.items.new.tsx"),
    route("items/pdf", "routes/admin.items.pdf.tsx"),
    route("items/delete", "routes/admin.items.delete.tsx"),
    route("items/:id/edit", "routes/admin.items._id_.edit.tsx"),
    route("logout", "routes/admin.logout.tsx"),
  ]),
] satisfies RouteConfig;
