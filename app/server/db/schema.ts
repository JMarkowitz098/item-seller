import { integer, real, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  image_path: text("image_path").notNull(),
  sold: integer("sold", { mode: "boolean" }).notNull().default(false),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
